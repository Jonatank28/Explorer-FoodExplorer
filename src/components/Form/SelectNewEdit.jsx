import React from 'react'
import { Field, ErrorMessage, useField } from 'formik'

const SelectNewEdit = ({ name, label, options, placeholder, errorSelect }) => {
    const [field, , helpers] = useField(name)

    const handleSelectChange = (event) => {
        const selectedOption = options.find(
            (option) => option.value.toString() === event.target.value
        )
        helpers.setValue(selectedOption)
    }

    return (
        <div className="flex flex-col gap-3 pt-0 md:pt-8 relative w-full md:w-[364px]">
            <label
                htmlFor={name}
                className="text-light-400 font-roboto text-base leading-4"
            >
                {label}
            </label>
            <Field
                as="select"
                className="bg-dark-800 py-3 px-[14px] w-full md:w-[364px] rounded-lg text-light-100"
                id={name}
                name={name}
                value={field.value?.value || ''}
                onChange={handleSelectChange}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
            {errorSelect &&
                errorSelect.status &&
                errorSelect.name == 'category' && (
                    <span className="text-red-500 text-xs font-roboto absolute -bottom-5 right-0 ">
                        {errorSelect.message}
                    </span>
                )}

            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs absolute -bottom-5 right-0"
            />
        </div>
    )
}

export default SelectNewEdit
