'use client'
import './globals.css'
import { Roboto_Flex as Roboto, Poppins } from 'next/font/google'
import { AuthProvider } from '../context/authContext'
import { FoodProvider } from '../context/foodContext'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
})

export const metadata = {
    title: 'Food Explorer',
    description: 'Projeto final do programa Explorer da Rocketseat',
}

const BodyContent = ({ children }) => {
    const { errorCode, setErrorCode } = useContext(AuthContext)
    const router = useRouter()
    const pathname = usePathname()

    if (
        pathname !== '/expired-session' &&
        pathname !== '/login' &&
        pathname !== '/register' &&
        errorCode === 419
    ) {
        router.push('/expired-session')
        setErrorCode('')
    }

    return (
        <body
            className={`${roboto.variable} ${poppins.variable} font-poppins bg-dark-400`}
        >
            {children}
        </body>
    )
}

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
            <FoodProvider>
                <html lang="en">
                    <BodyContent>{children}</BodyContent>
                </html>
            </FoodProvider>
        </AuthProvider>
    )
}
