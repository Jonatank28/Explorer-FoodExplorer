import React from 'react'
import { formatarReal } from '@/services/formater'

const Order = ({ item }) => {
    return (
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
                            {formatarReal(item?.value)}
                        </span>
                    </div>
                </div>
                <div>
                    <span className="font-roboto text-tints-Tomato400 text-xs font-normal">
                        Excluir
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Order
