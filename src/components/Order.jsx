'use client'
import { useContext, useState } from 'react'
import { formatarReal } from '@/services/formater'
import { foodContext } from '@/context/foodContext'
import Toaster from './Toaster'

const Order = ({ item }) => {
    const { selectedItems, setSelectedItems } = useContext(foodContext)
    const [showToaster, setShowToaster] = useState({
        status: false,
        message: '',
        tag: '',
    })

    //! Remove item do carrinho
    const removedItem = (item) => {
        setShowToaster({
            status: false,
            message: '',
            tag: '',
        })
        if (item) {
            const newItems = selectedItems.filter(
                (itemFilter) => itemFilter !== item
            )
            localStorage.setItem('selectedItems', JSON.stringify(newItems))
            setSelectedItems(newItems)
            setShowToaster({
                status: true,
                message: 'Prato removido com sucesso',
                tag: 'success',
            })
        }
    }

    return (
        <>
            {showToaster.status && (
                <Toaster message={showToaster.message} tag={showToaster.tag} />
            )}
            <div className="flex items-center gap-2">
                <div>
                    <img
                        src={item?.imagePath}
                        alt="Foto do prato"
                        className="w-14 h-14 rounded-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="">
                            <span className="text-light-300 text-xl font-poppins font-medium">
                                {item?.amount + ' ' + item?.name}
                            </span>
                        </div>
                        <div>
                            <span className="font-roboto text-xs text-light-400 font-normal">
                                {formatarReal(item?.value * item?.amount)}
                            </span>
                        </div>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => removedItem(item)}
                    >
                        <span className="font-roboto text-tints-Tomato400 text-xs p-1 rounded-lg font-normal transition-colors hover:bg-gray-500/10">
                            Excluir
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
