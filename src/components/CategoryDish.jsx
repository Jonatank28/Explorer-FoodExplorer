'use client'
import React from 'react'
import Card from './Card'

const CategoryDish = ({ title, index }) => {
    return (
        <>
            <h1
                className={`text-light-300 font-poppins font-normal text-[32px] pb-6 ${
                    index >= 1 ? 'mt-[47px]' : ''
                }`}
            >
                {title}
            </h1>
            <div className="flex items-center gap-6">
                <Card index={index} />
            </div>
        </>
    )
}

export default CategoryDish
