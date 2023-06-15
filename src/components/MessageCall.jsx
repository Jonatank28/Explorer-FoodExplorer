'use client'
import React, { useEffect, useState } from 'react'

const MessageCall = () => {
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

    return (
        <section>
            <div className="bg-[url(../assets/DegradeGreen.svg)] h-32 md:h-64 bg-cover mx-auto flex justify-end items-center mt-11 md:mt-[172px] relative z-10 w-default">
                <div className="flex flex-col justify-center items-end pr-5 md:pr-24">
                    <h1 className="text-light-300 font-poppins font-semibold md:font-medium text-lg md:text-[40px] leading-snug z-30">
                        Sabores inigualáveis
                    </h1>
                    <p className="text-light-300 font-poppins md:font-roboto font-normal md:font-normal text-xs md:text-base leading-4 z-30 text-right">
                        Sinta o cuidado do preparo com ingredientes selecionados
                    </p>
                    <img
                        className="absolute bottom-1 md:bottom-0 -left-6 md:-left-12 z-20"
                        src={isMobile ? 'FruitsMobile.svg' : 'Fruits.svg'}
                        alt=""
                    />
                </div>
            </div>
        </section>
    )
}

export default MessageCall
