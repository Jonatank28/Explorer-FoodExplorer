'use client'
import { AuthContext } from '@/context/authContext'
import { foodContext } from '@/context/foodContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import IconPix from '@/icon/IconPix'
import IconCreditCard from '@/icon/IconCreditCard'
import IconQRCODE from '@/icon/IconQRCODE'
import Order from '@/components/Order'
import CreditCard from '@/components/CreditCard'
import ButtonNextBack from '@/components/ButtonNextBack'
import CheckdPayment from '@/components/CheckdPayment'

export default function Home() {
    const { sidebarOpen, permission, setFixedFooter } = useContext(AuthContext)
    const { selectedItems, totalSum } = useContext(foodContext)
    console.log('🚀 ~ selectedItems:', selectedItems)
    const [selected, setSelected] = useState('pix')
    const [selectMobile, setSelectMobile] = useState(false)

    useEffect(() => {
        setFixedFooter(false)
    }, [])
    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <div className="mx-auto w-default flex justify-between mt-[34px] px-2 md:px-0 mb-[400px]">
                        {/* div da esquerda */}
                        <div
                            className={`${
                                !selectMobile ? 'block' : 'hidden'
                            } md:block`}
                        >
                            <h1 className="font-poppins font-medium text-[32px] text-light-300 ">
                                Meu pedido
                            </h1>
                            <div className="flex flex-col mt-8 gap-10">
                                {selectedItems.map((item, index) => (
                                    <Order item={item} />
                                ))}
                                {selectedItems.length > 0 && (
                                    <h1 className="font-poppins font-medium text-light-300 text-xl mt-4">
                                        Total: R$ {totalSum}
                                    </h1>
                                )}
                            </div>
                        </div>
                        {/* div da direira */}
                        <div
                            className={`w-full md:w-[50%] ${
                                selectMobile ? 'block' : 'hidden'
                            } md:block`}
                        >
                            <h1 className="font-poppins font-medium text-[32px] text-light-300 ">
                                Pagamento
                            </h1>
                            <div className="mt-8 border border-light-600 rounded-lg ">
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
                                        onClick={() => setSelected('credit')}
                                        className={`flex justify-center items-center gap-2 w-[50%] py-8 border-l border-b border-light-600  rounded-tr-lg cursor-pointer ${
                                            selected !== 'pix' && 'bg-dark-800'
                                        }`}
                                    >
                                        <IconCreditCard
                                            width={22}
                                            height={22}
                                        />
                                        <h1>Crédito</h1>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center h-[400px]">
                                    {selected === 'pix' ? (
                                        <IconQRCODE width={22} height={22} />
                                    ) : selected === 'credit' ? (
                                        <CreditCard setSelected={setSelected} />
                                    ) : (
                                        <CheckdPayment />
                                    )}
                                </div>
                            </div>
                        </div>
                        <ButtonNextBack
                            setSelectMobile={setSelectMobile}
                            selectMobile={selectMobile}
                        />
                    </div>
                )}
                <Footer />
            </main>
        )
    )
}
