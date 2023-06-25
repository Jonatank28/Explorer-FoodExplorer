'use client'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [fixedFooter, setFixedFooter] = useState(false)
    const [user, setUser] = useState()
    const [permission, setPermission] = useState(false)
    const [errorReq, setErrorReq] = useState('')
    const [newTag, setNewTag] = useState('')
    const [errorCode, setErrorCode] = useState('')
    const [showToaster, setShowToaster] = useState({
        status: false,
        message: '',
        tag: '',
    })
    const router = useRouter()

    //! Faz login do usuário
    const login = (email, password) => {
        const values = { email, password }
        api.post('/login', values)
            .then((response) => {
                const token = response.data.token
                userAuthentication(token)
                router.push('/')
            })
            .catch((error) => {
                setErrorReq(error.response.data.message)
                setTimeout(() => {
                    setErrorReq('')
                }, 2000)
            })
    }

    //! Desloga usuário
    const handleExitSection = () => {
        router.push('/login')
        setSidebarOpen(false)
        localStorage.removeItem('user')
    }

    //! Faz a autenticação do usuário
    const userAuthentication = (token) => {
        api.get('/login-verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const user = {
                    ...response.data,
                    token: token,
                }
                setUser(user)
                setPermission(true)
                localStorage.setItem('user', JSON.stringify(user))
            })
            .catch((error) => {
                console.log(error)
                setErrorCode(error.response.status)
            })
    }

    //! Cadastra novo usuário
    const registerUser = async (name, email, password) => {
        const values = { name, email, password }
        await api
            .post('/register', values)
            .then((response) => {
                if (response.status !== 201) return
                setShowToaster({
                    status: true,
                    message: 'Conta criada com sucesso',
                    tag: 'success',
                })
                setTimeout(() => {
                    setShowToaster({
                        status: false,
                        message: '',
                        tag: '',
                    })
                    router.push('/login')
                }, 2000)
            })
            .catch((error) => {
                setErrorReq(error?.response?.data?.message)
                setTimeout(() => {
                    setErrorReq('')
                }, 2000)
            })
    }

    //!  Verifica se o usuário tem acesso a cada página
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const user = JSON.parse(storedUser)

            const token = user.token
            userAuthentication(token)
        } else {
            setPermission(false)
            router.push('/login')
        }
    }, [])

    const values = {
        sidebarOpen,
        setSidebarOpen,
        setPermission,
        permission,
        login,
        handleExitSection,
        registerUser,
        user,
        errorReq,
        setErrorReq,
        fixedFooter,
        setFixedFooter,
        setNewTag,
        newTag,
        errorCode,
        setErrorCode,
        showToaster,
    }

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
