import React from 'react'
import { Field, ErrorMessage, useField } from 'formik'

const UploadFile = ({ name, type, label }) => {
    const [field, meta, helpers] = useField(name)
    const hasValue = field.value !== ''

    const handleInputChange = (event) => {
        helpers.setValue(event.target.value)
    }

    return (
        <div className="flex flex-col gap-3 pt-0 md:pt-8 w-full md:w-[250px] relative">
            <label
                htmlFor={name}
                className="text-light-400 font-roboto text-base leading-4 w-full"
            >
                {label}
            </label>
            <Field
                as="input"
                className={`bg-dark-800 py-[9px] px-[14px] rounded-lg w-full md:w-[250px] appearance-none ${
                    hasValue ? 'text-light-100' : 'text-light-500'
                }`}
                type={type}
                id={name}
                name={name}
                onChange={handleInputChange}
                initialTouched={meta.touched}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs absolute -bottom-5 right-0"
            />
        </div>
    )
}

export default UploadFile
