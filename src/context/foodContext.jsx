'use client'
import { api } from '@/services/api'
import { AuthContext } from './authContext'
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    use,
} from 'react'

const foodContext = createContext({})

const FoodProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState()
    const [selectedItems, setSelectedItems] = useState([])

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

    const values = {
        foods,
        setFoods,
        getFoods,
        setSelectedItems,
        selectedItems,
        totalSum,
    }
    return (
        <foodContext.Provider value={values}>{children}</foodContext.Provider>
    )
}

export { foodContext, FoodProvider }
