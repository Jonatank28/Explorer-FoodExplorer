'use client'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MessageCall from '@/components/MessageCall'
import MarketFood from '@/components/MarketFood'

export default function Home() {
    const { sidebarOpen, permission, setFixedFooter } = useContext(AuthContext)

    useEffect(() => {
        setFixedFooter(false)
    }, [])
    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <>
                        <MessageCall />
                        <MarketFood />
                    </>
                )}
                <Footer />
            </main>
        )
    )
}
