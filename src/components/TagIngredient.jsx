import React from 'react'
import { Field, ErrorMessage, useField } from 'formik'
import IconClose from '@/icon/IconClose'
import IconPlus from '@/icon/IconPlus'
import { AuthContext } from '@/context/authContext'
import { useContext } from 'react'

const TagIngredient = ({ title, isNew, onClick, value, errorTag }) => {
    const { setNewTag } = useContext(AuthContext)
    const [field, helpers] = useField('newIngredient')
    const hasValue = field.value !== ''

    const handleInputChange = (event) => {
        helpers.setValue(event.target.value)
    }

    return (
        <div
            className={`px-2 py-1 rounded-lg flex items-center justify-center gap-1 relative ${
                isNew ? 'bg-transparent border border-dotted' : 'bg-light-600'
            }`}
        >
            {isNew ? (
                <>
                    <Field
                        as="input"
                        name="newIngredient"
                        type="text"
                        value={value}
                        className={`font-roboto font-normal text-base bg-transparent outline-none ${
                            hasValue ? 'text-light-100' : 'text-light-500'
                        }`}
                        placeholder="Adicionar"
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <IconPlus
                        className="text-light-500 cursor-pointer"
                        onClick={onClick}
                    />
                    {errorTag.status && errorTag.name == 'tags' && (
                        <span className="text-red-500 text-xs font-roboto absolute -bottom-5 right-0 ">
                            {errorTag.message}
                        </span>
                    )}
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
