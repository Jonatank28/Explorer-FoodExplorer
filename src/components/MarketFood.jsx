'use client'
import React, { useContext } from 'react'
import { foodContext } from '@/context/foodContext'
import Category from './Category'

const MarketFood = () => {
    const { foods } = useContext(foodContext)

    return (
        <section className="w-default mx-auto m-24">
            {foods &&
                foods.map((category, index) => (
                    <Category key={category} index={index} />
                ))}
        </section>
    )
}

export default MarketFood
