import React, { useEffect, useState } from 'react'

const Toaster = ({ message, tag }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div
            className={`${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0'
            } fixed bottom-5 left-1/2 transform -translate-x-1/2 w-64 p-4 rounded-md text-white text-center transition-all duration-300 z-50 ${
                tag === 'error'
                    ? 'bg-red-500'
                    : tag === 'primary'
                    ? 'bg-blue-500'
                    : tag === 'success'
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
            }`}
        >
            {message}
        </div>
    )
}

export default Toaster
