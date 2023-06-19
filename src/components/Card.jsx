'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context/authContext'
import { foodContext } from '@/context/foodContext'
import IconHeart from '@/icon/IconHeart'
import IconPencil from '@/icon/IconPencil'
import IconLine from '@/icon/IconLine'
import IconAddOutline from '@/icon/IconAddOutline'

const Card = ({ index }) => {
    const { user } = useContext(AuthContext)
    const { foods } = useContext(foodContext)

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text
        }
        return text.substring(0, maxLength - 3) + '...'
    }

    return (
        <>
            {foods?.[index]?.foods?.map((item) => (
                <div
                    className="bg-dark-200 py-6 md:py-16 px-6 w-52 md:min-w-[304px] min-h-[290px] flex flex-col justify-center items-center relative"
                    key={item.foodID}
                >
                    {user?.papelID === 1 ? (
                        <Link href={`/edit-dish?id=${item.foodID}`}>
                            <IconPencil
                                height={34}
                                width={34}
                                className="absolute top-4 right-4 md:top-6 md:right-6 text-light-300 cursor-pointer"
                            />
                        </Link>
                    ) : (
                        <IconHeart
                            height={34}
                            width={34}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-light-300 cursor-pointer"
                        />
                    )}
                    <img
                        src={item.imagePath}
                        alt=""
                        className="w-[88px] h-[88px] md:w-44 md:h-44 rounded-full"
                    />
                    <div className="space-y-3 mt-[15px] text-center w-[162px] md:w-auto">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="font-poppins text-light-300 font-bold leading-8 text-sm md:text-xl">
                                {item.name}{' '}
                            </h1>
                            <Link
                                href={`/dish?id=${item.foodID}`}
                                className="cursor-pointer text-light-300 font-bold leading-8 font-poppins text-xl px-2 py-1"
                            >
                                {'>'}
                            </Link>
                        </div>
                        <p className=" text-light-400 font-roboto text-sm leading-5 font-normal hidden md:block">
                            {truncateText(item.description, 54)}
                        </p>
                        <h1 className="text-tints-Cake200 font-roboto font-normal text-2xl leading-snug">
                            R$ {item.value}
                        </h1>
                        {user?.papelID === 0 && (
                            <div className="flex flex-col justify-center md:flex-row items-center gap-4 pt-[15px] ">
                                <div className="flex items-center justify-between">
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
                                <div className="bg-tints-Tomato100 px-6 py-3 rounded-[5px] w-full cursor-pointer">
                                    <span className="text-light-100 font-poppins font-medium text-sm leading-6">
                                        incluir
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default Card
