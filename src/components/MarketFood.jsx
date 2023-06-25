'use client'
import React, { useContext } from 'react'
import { foodContext } from '@/context/foodContext'
import Category from './Category'

const MarketFood = () => {
    const { foods, filteredFoods } = useContext(foodContext)

    return (
        <section className="w-default mx-auto m-24">
            {(foods && filteredFoods.length > 0 ? filteredFoods : foods)?.map(
                (category, index) => {
                    return <Category index={index} />
                }
            )}
        </section>
    )
}

export default MarketFood
