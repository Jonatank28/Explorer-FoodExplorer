'use client'
import { api } from '@/services/api'
import { AuthContext } from './authContext'
import React, { createContext, useState, useEffect, useContext } from 'react'

const foodContext = createContext({})

const FoodProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState()

    //! Função que busca os foods do banco de dados
    const getFoods = async () => {
        try {
            const response = await api.get('/foods')
            setFoods(response.data)
            console.log('data', response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFoods()
    }, [user])

    const values = {
        foods,
        setFoods,
    }

    return (
        <foodContext.Provider value={values}>{children}</foodContext.Provider>
    )
}

export { foodContext, FoodProvider }
