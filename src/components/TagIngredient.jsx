import React from 'react'
import { Field, ErrorMessage } from 'formik'
import IconClose from '@/icon/IconClose'
import IconPlus from '@/icon/IconPlus'

const TagIngredient = ({ title, isNew, onClick }) => {
    return (
        <div
            className={`px-2 py-1 rounded-lg w-32 flex items-center gap-1 ${
                isNew
                    ? 'bg-transparent border border-dotted border-spacing-40'
                    : 'bg-light-600'
            }`}
        >
            {isNew ? (
                <>
                    <Field
                        as="input"
                        name="newIngredient"
                        type="text"
                        className="font-roboto font-normal text-base bg-transparent text-light-500 w-full outline-none"
                        placeholder="Adicionar"
                    />
                    <IconPlus
                        className="text-light-500 cursor-pointer"
                        onClick={onClick}
                    />
                </>
            ) : (
                <>
                    <span className="font-roboto font-normal text-base text-light-100">
                        {title}
                    </span>
                    <IconClose
                        className="text-light-100 cursor-pointer"
                        onClick={onClick}
                    />
                </>
            )}
            {isNew && (
                <ErrorMessage
                    name="newIngredient"
                    component="div"
                    className="text-red-400 text-xs"
                />
            )}
        </div>
    )
}

export default TagIngredient
