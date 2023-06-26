'use client'
import { useContext, useState } from 'react'
import { foodContext } from '@/context/foodContext'
import Link from 'next/link'
import { api } from '@/services/api'
import { AuthContext } from '@/context/authContext'
import IconHeart from '@/icon/IconHeart'
import IconPencil from '@/icon/IconPencil'
import IconLine from '@/icon/IconLine'
import IconAddOutline from '@/icon/IconAddOutline'
import { formatarReal } from '@/services/formater'
import Toaster from './Toaster'

const Card = ({ index, selectItems }) => {
    const { user } = useContext(AuthContext)
    const { foods, setSelectedItems, getFoods, filteredFoods } =
        useContext(foodContext)
    const [amountDishe, setAmountDishe] = useState([])
    const [showToaster, setShowToaster] = useState({
        status: false,
        message: '',
        tag: '',
    })

    console.log('🚀 ~ foods:', foods)
    //! Trunca o texto para 54 caracteres
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text
        }
        return text.substring(0, maxLength - 3) + '...'
    }

    //! Atualiza o status do prato(favorito ou não)
    const handleFavoriteClick = async (item) => {
        if (item.foodID) {
            await api
                .put(`/foods/update/favorite/${item.foodID}/${user.userID}`)
                .then((response) => {
                    getFoods()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    //! Altera a quantidade do prato
    const handleAmountChange = (itemIndex, value) => {
        setAmountDishe((prevAmount) => {
            const updatedAmount = [...prevAmount]
            updatedAmount[itemIndex] = {
                ...updatedAmount[itemIndex],
                amount: value,
            }
            return updatedAmount
        })
    }

    //! Adicionar ao carrinho
    const handleIncludeClick = (itemIndex) => {
        const selectedAmount = amountDishe[itemIndex]?.amount || 0
        const itemSelected = foods?.[index]?.foods?.[itemIndex]
        if (selectedAmount > 0) {
            const item = {
                ...itemSelected,
                amount: selectedAmount,
            }
            setAmountDishe((prevAmount) => {
                const updatedAmount = [...prevAmount]
                updatedAmount[itemIndex] = {
                    ...updatedAmount[itemIndex],
                    amount: 0,
                }
                return updatedAmount
            })
            const itemsFromStorage =
                JSON.parse(localStorage.getItem('selectedItems')) || []
            itemsFromStorage.push(item)
            localStorage.setItem(
                'selectedItems',
                JSON.stringify(itemsFromStorage)
            )
            setSelectedItems(itemsFromStorage)
            setShowToaster({
                status: true,
                message: 'Prato adicionado com sucesso',
                tag: 'success',
            })
            setTimeout(() => {
                setShowToaster({
                    status: false,
                    message: '',
                    tag: '',
                })
            }, 3000)
        }
    }

    return (
        <>
            {showToaster.status && (
                <Toaster message={showToaster.message} tag={showToaster.tag} />
            )}
            {(foods && filteredFoods.length > 0
                ? filteredFoods[index]?.foods
                : foods?.[index]?.foods
            )?.map((item, itemIndex) => {
                const itemAmount = amountDishe[itemIndex]?.amount || 0
                const formattedItemAmount =
                    itemAmount < 0
                        ? '0' + 0
                        : itemAmount < 10
                        ? `0${itemAmount}`
                        : itemAmount

                return (
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
                                onClick={() => handleFavoriteClick(item)}
                                height={34}
                                width={34}
                                className={`absolute top-4 right-4 md:top-6 md:right-6 text-light-300 cursor-pointer active:animate-ping     ${
                                    item.favorite && 'fill-red-900'
                                }`}
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
                            <p className="text-light-400 font-roboto text-sm leading-5 font-normal hidden md:block">
                                {truncateText(item.description, 54)}
                            </p>
                            <h1 className="text-tints-Cake200 font-roboto font-normal text-2xl leading-snug">
                                {formatarReal(item.value)}
                            </h1>
                            {user?.papelID === 0 && (
                                <div className="flex flex-col justify-center md:flex-row items-center gap-4 pt-[15px] ">
                                    <div className="flex items-center justify-between">
                                        <IconLine
                                            height={34}
                                            width={34}
                                            className="text-light-300 pr-2 cursor-pointer active:animate-bounce"
                                            onClick={() => {
                                                if (itemAmount > 0) {
                                                    handleAmountChange(
                                                        itemIndex,
                                                        itemAmount - 1
                                                    )
                                                }
                                            }}
                                        />
                                        <p className="text-light-300 text-base font-normal font-roboto ">
                                            {formattedItemAmount}
                                        </p>
                                        <IconAddOutline
                                            onClick={() =>
                                                handleAmountChange(
                                                    itemIndex,
                                                    itemAmount + 1
                                                )
                                            }
                                            height={34}
                                            width={34}
                                            className="text-light-300 cursor-pointer active:animate-bounce"
                                        />
                                    </div>
                                    <div
                                        className={` px-6 py-3 rounded-[5px] w-full cursor-pointer ${
                                            itemAmount === 0
                                                ? 'bg-tints-Tomato100/60'
                                                : 'bg-tints-Tomato100'
                                        } `}
                                        onClick={() =>
                                            handleIncludeClick(itemIndex)
                                        }
                                    >
                                        <span className="text-light-100 font-poppins font-medium text-sm leading-6">
                                            incluir
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Card
