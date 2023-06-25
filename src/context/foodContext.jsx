'use client'
import { api } from '@/services/api'
import { AuthContext } from './authContext'
import { createContext, useState, useEffect, useContext } from 'react'

const foodContext = createContext({})

const FoodProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState()
    const [selectedItems, setSelectedItems] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([])

    //! Função que busca os foods do banco de dados
    const getFoods = async () => {
        try {
            const response = await api.get('/foods')
            setFoods(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFoods()
    }, [user])

    useEffect(() => {
        const itemsFromStorage =
            JSON.parse(localStorage.getItem('selectedItems')) || []
        setSelectedItems(itemsFromStorage)
    }, [])

    //! Função que calcula o total do pedido
    let totalSum = 0
    selectedItems?.map((item) => {
        const itemTotal = item.value * item.amount
        totalSum += itemTotal
    })

    //! Função que filtra por nome de prato e retorna um array com os pratos filtrados
    const filterFoods = (searchTerm) => {
        const filtered = foods.reduce((result, category) => {
            const filteredFoods = category.foods.filter((food) =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            if (filteredFoods.length > 0) {
                result.push({
                    category: category.category,
                    foods: filteredFoods,
                })
            }
            return result
        }, [])
        setFilteredFoods(filtered)
    }

    const values = {
        foods,
        setFoods,
        getFoods,
        setSelectedItems,
        selectedItems,
        totalSum,
        filterFoods,
        filteredFoods,
        setFilteredFoods,
    }
    return (
        <foodContext.Provider value={values}>{children}</foodContext.Provider>
    )
}

export { foodContext, FoodProvider }
