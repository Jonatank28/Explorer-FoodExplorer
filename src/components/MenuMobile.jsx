import React, { useContext } from 'react'
import { AuthContext } from '@/context/authContext'
import IconClose from '@/icon/IconClose'
import IconSearch from '@/icon/IconSearch'
import Link from 'next/link'

const MenuMobile = ({ setSidebarOpen }) => {
    const { user, handleExitSection } = useContext(AuthContext)

    const handleNewDish = () => {
        setSidebarOpen(false)
    }

    return (
        <header className="">
            <div className="bg-dark-600 px-7">
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="pb-7 pt-14 flex items-center gap-4 cursor-pointer"
                    style={{ width: 'min(1120px, 96%)' }}
                >
                    <IconClose
                        height={24}
                        width={24}
                        className="text-light-100"
                    />
                    <span className="text-light-100 font-roboto font-normal text-xl">
                        Menu
                    </span>
                </div>
            </div>
            <div className="mt-9 mx-7">
                <div className="flex gap-2 px-[14px] bg-dark-900 py-3 text-light-500 rounded-[5px]">
                    <IconSearch height={30} width={30} />
                    <input
                        type="text"
                        placeholder="Busque por pratos ou ingredientes"
                        className="w-full bg-dark-900 outline-none text-sm"
                    />
                </div>
                <div className="mt-9">
                    {user?.papelID == 1 && (
                        <Link
                            onClick={handleNewDish}
                            className="text-light-100 font-poppins font-light leading-8 border-b border-dark-1000 cursor-pointer"
                            href="/add-dish"
                        >
                            Novo prato
                        </Link>
                    )}
                    <p
                        onClick={handleExitSection}
                        className="text-light-100 font-poppins font-light leading-8 border-b border-dark-1000 cursor-pointer"
                    >
                        Sair
                    </p>
                </div>
            </div>
        </header>
    )
}

export default MenuMobile
