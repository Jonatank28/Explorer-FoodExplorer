import './globals.css'
import { Roboto_Flex as Roboto, Poppins } from 'next/font/google'
import { AuthProvider } from '../context/authContext'
import { FoodProvider } from '../context/foodContext'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
})

export const metadata = {
    title: 'Food Explorer',
    description: 'Projeto de finalização do curso Explorer',
}

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
            <FoodProvider>
                <html lang="en">
                    <body
                        className={`${roboto.variable} ${poppins.variable} font-poppins bg-dark-400`}
                    >
                        {children}
                    </body>
                </html>
            </FoodProvider>
        </AuthProvider>
    )
}
