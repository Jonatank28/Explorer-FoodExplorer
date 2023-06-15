'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from '@/context/authContext'

const Footer = () => {
    const { sidebarOpen, fixedFooter } = useContext(AuthContext)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const currentYear = new Date().getFullYear()

    return (
        <footer
            className={`bg-dark-600 ${
                sidebarOpen || fixedFooter ? 'fixed bottom-0 w-full' : ''
            }`}
        >
            <div className="flex items-center justify-between mx-auto py-6 px-1 w-default">
                <Link href="/">
                    <Image
                        src="/IconeLogoLowOpacity.svg"
                        alt="Logo do food explorer com menos opacidade"
                        width={130}
                        height={130}
                    />
                </Link>
                <span className="text-light-200 font-roboto font-normal text-[10px] md:text-sm">
                    © {currentYear} - Todos os direitos reservados.
                </span>
            </div>
        </footer>
    )
}

export default Footer
