import React from 'react'

const ButtonNextBack = ({ setSelectMobile, selectMobile }) => {
    return (
        <div
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-tints-Tomato100 cursor-pointer absolute bottom-24 right-4 w-[200px] md:hidden"
            onClick={() => setSelectMobile(!selectMobile)}
        >
            <span className="font-poppins text-light-100 font-medium text-sm">
                {!selectMobile ? 'Avançar' : 'Voltar'}
            </span>
        </div>
    )
}

export default ButtonNextBack
