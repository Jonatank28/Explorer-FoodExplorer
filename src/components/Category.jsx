'use client'
import React from 'react'
import Card from './Card'

const Category = ({ index }) => {
    return (
        <>
            <h1
                className={`text-light-300 font-poppins font-normal text-lg md:text-[32px] pb-6 ${
                    index >= 1 ? 'mt-[47px]' : ''
                }`}
            >
                {index === 0
                    ? 'Refeições'
                    : index === 1
                    ? 'Sobremesas'
                    : index === 2
                    ? 'Bebidas'
                    : ''}
            </h1>
            <div className="flex overflow-x-auto items-center gap-6">
                <Card index={index} />
            </div>
        </>
    )
}

export default Category
