'use client'
import { api } from '@/services/api'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import IconAddOutline from '@/icon/IconAddOutline'
import IconLine from '@/icon/IconLine'
import { useSearchParams } from 'next/navigation'

const DishSelected = ({}) => {
    const { sidebarOpen, permission, setFixedFooter, user } =
        useContext(AuthContext)
    const [data, setData] = useState(null)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getFoodSelect = async () => {
        try {
            const response = await api.get(`/foods-select/${id}`)
            console.log(response.data)

            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log('dados', data)

    useEffect(() => {
        setFixedFooter(true)
        getFoodSelect()
    }, [])

    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <>
                        <div className=" w-default mx-auto cursor-pointer px-4 md:px-0">
                            <div className="pt-4 md:pt-6 ">
                                <Link
                                    href="/"
                                    className="font-poppins text-light-300 font-normal md:font-bold md:text-2xl pl-2 "
                                >
                                    {'< '}Voltar
                                </Link>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-start pt-6 md:pt-10 gap-12">
                                <div className="">
                                    <img
                                        src={`${data?.food[0].imagePath}`}
                                        alt={`Foto do prato: ${data?.food[0].name}`}
                                        className="w-[264px] h-[264px] md:w-[390px] md:h-[390px]"
                                    />
                                </div>
                                <div className="">
                                    <h1 className="text-light-300 font-poppins font-medium text-[27px] md:text-[40px] leading-snug text-center md:text-left">
                                        {data?.food[0].name}
                                    </h1>
                                    <p className="text-light-300 font-poppins font-normal text-sm md:text-base mt-2 text-center md:text-left">
                                        {data?.food[0].description}
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start flex-wrap gap-2 mt-8">
                                        {data?.ingredients.map((item) => (
                                            <div className="bg-dark-1000 px-2 py-1 rounded-md">
                                                <span className="text-light-100 font-poppins font-medium text-sm">
                                                    {item.ingrediente}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-8 mt-12 mb-24 md:mb-12">
                                        {user?.papelID == 0 && (
                                            <div className="flex items-center">
                                                <IconLine
                                                    height={34}
                                                    width={34}
                                                    className="text-light-300 pr-2 cursor-pointer"
                                                />
                                                <p className="text-light-300 text-base font-normal font-roboto ">
                                                    01
                                                </p>
                                                <IconAddOutline
                                                    height={34}
                                                    width={34}
                                                    className="text-light-300 cursor-pointer"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center bg-tints-Tomato100 py-3 px-6 rounded-md text-light-100 font-poppins font-medium text-sm leading-6 ">
                                            {user?.papelID == 1 ? (
                                                <Link
                                                    href={`/edit-dish?id=${data?.food[0]?.foodID}`}
                                                >
                                                    Editar prato
                                                </Link>
                                            ) : (
                                                <>
                                                    <span>incluir</span>
                                                    <span className="px-1">
                                                        -
                                                    </span>
                                                    <span>R$ 25,00</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <Footer />
            </main>
        )
    )
}

export default DishSelected
