'use client'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import IconPix from '@/icon/IconPix'
import IconCreditCard from '@/icon/IconCreditCard'
import IconQRCODE from '@/icon/IconQRCODE'
import IconReceipt from '@/icon/IconReceipt'

export default function Home() {
    const { sidebarOpen, permission, setFixedFooter } = useContext(AuthContext)
    const [selected, setSelected] = useState('pix')

    useEffect(() => {
        setFixedFooter(true)
    }, [])
    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <div className="mx-auto w-default flex justify-between mt-[34px]">
                        <div>
                            <h1 className="font-poppins font-medium text-[32px] text-light-300 ">
                                Meu pedido
                            </h1>
                        </div>
                        <div className=" w-[50%]">
                            <h1 className="font-poppins font-medium text-[32px] text-light-300 ">
                                Pagamento
                            </h1>
                            <div className="mt-8 border border-light-600 rounded-lg">
                                <div className="text-light-100 font-roboto font-normal text-base flex justify-between">
                                    <div
                                        onClick={() => setSelected('pix')}
                                        className={`flex justify-center items-center gap-2 w-[50%] py-8 border-b border-light-600 rounded-tl-lg rounded-tr-lg cursor-pointer ${
                                            selected === 'pix' && 'bg-dark-800'
                                        }`}
                                    >
                                        <IconPix width={22} height={22} />
                                        <h1>PIX</h1>
                                    </div>
                                    <div
                                        onClick={() => setSelected('credito')}
                                        className={`flex justify-center items-center gap-2 w-[50%] py-8 border-l border-b border-light-600  rounded-tr-lg cursor-pointer ${
                                            selected === 'credito' &&
                                            'bg-dark-800'
                                        }`}
                                    >
                                        <IconCreditCard
                                            width={22}
                                            height={22}
                                        />
                                        <h1>Crédito</h1>
                                    </div>
                                </div>
                                {selected === 'pix' ? (
                                    <div className="flex justify-center items-center h-[400px]">
                                        <IconQRCODE width={22} height={22} />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-[400px]">
                                        <div className="flex flex-col gap-9">
                                            <div className="flex flex-col gap-2">
                                                <label className="font-roboto font-normal text-base text-light-400">
                                                    Número do Cartão
                                                </label>
                                                <input
                                                    className="w-[348px] px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100"
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <label className="font-roboto font-normal text-base text-light-400">
                                                        Validade
                                                    </label>
                                                    <input
                                                        className="px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100"
                                                        type="text"
                                                        placeholder="04/25"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="font-roboto font-normal text-base text-light-400">
                                                        CVC
                                                    </label>
                                                    <input
                                                        className="px-[14px] py-3 text-light-100 rounded-md bg-transparent border border-light-100"
                                                        type="text"
                                                        placeholder="000"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-tints-Tomato100">
                                                <IconReceipt />
                                                <span className="font-poppins text-light-100 font-medium text-sm">
                                                    Finalizar pagamento
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </main>
        )
    )
}
