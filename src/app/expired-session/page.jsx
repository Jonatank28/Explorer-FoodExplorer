'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const TokenExpired = () => {
    const router = useRouter()

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push('/login')
        }, 5000)

        return () => clearTimeout(redirectTimeout)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-5000 w-[95%] md:w-auto mx-auto ">
            <div className="max-w-md mx-auto p-6 bg-white/90 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">Token expirado</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Seu token de autenticação expirou. Por favor, faça login
                    novamente.
                </p>
                <p className="text-gray-500">
                    Você será redirecionado para a página de login em alguns
                    segundos.
                </p>
            </div>
        </div>
    )
}

export default TokenExpired
