'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from '@/context/authContext'
import IconExit_right from '@/icon/IconExit_right'
import IconMenu from '@/icon/IconMenu'
import IconReceipt from '@/icon/IconReceipt'
import IconSearch from '@/icon/IconSearch'
import MenuMobile from './MenuMobile'

const Header = () => {
    const { user, setSidebarOpen, sidebarOpen, handleExitSection } =
        useContext(AuthContext)

    return (
        <>
            {' '}
            {sidebarOpen ? (
                <MenuMobile setSidebarOpen={setSidebarOpen} />
            ) : (
                <header className="bg-dark-600 sticky top-0 z-50">
                    <div className="mx-auto flex items-center justify-between pb-7 pt-14 md:pt-7 md:gap-8 px-1 w-default">
                        <div
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden cursor-pointer"
                        >
                            <IconMenu
                                height={24}
                                width={24}
                                className="text-light-100"
                            />
                        </div>
                        <Link
                            href="/"
                            className="flex items-center justify-center md:items-end gap-2 md:gap-0 flex-row md:flex-col cursor-pointer w-full md:w-auto"
                        >
                            <Image
                                src="/IconeLogo.svg"
                                alt="Logo do food explorer"
                                width={200}
                                height={200}
                            />
                            {user?.papelID == 1 && (
                                <span className="font-roboto font-normal text-xs text-tints-Cake200 leading-4 pt-1 md:pt-0">
                                    admin
                                </span>
                            )}
                        </Link>
                        {user?.papelID != 1 && (
                            <div className="md:hidden flex justify-end relative">
                                <IconReceipt />
                                <div className="bg-tints-Tomato100 rounded-full absolute -top-2 -right-2 w-6 h-6 flex justify-center items-center">
                                    <span className="text-light-100 text-sm font-poppins font-medium">
                                        0
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="hidden md:flex gap-2 flex-1 bg-dark-900 py-3 px-4 text-light-500 rounded-[5px]">
                            <IconSearch height={30} width={30} />
                            <input
                                type="text"
                                placeholder="Busque por pratos ou ingredientes"
                                className="w-full bg-dark-900 outline-none"
                            />
                        </div>
                        <div className="text-light-100 flex items-center gap-8">
                            {/* Se for client */}
                            <div className="bg-tints-Tomato100 py-3 px-8 rounded-[5px] items-center gap-2 cursor-pointer hidden md:flex">
                                {user?.papelID == 1 ? (
                                    <Link href="/add-dish">Novo prato</Link>
                                ) : (
                                    <>
                                        <IconReceipt />
                                        <span>Pedidos (0)</span>
                                    </>
                                )}
                            </div>
                            <div
                                className="cursor-pointer hidden md:block"
                                onClick={handleExitSection}
                            >
                                <IconExit_right height={30} width={30} />
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    )
}

export default Header
