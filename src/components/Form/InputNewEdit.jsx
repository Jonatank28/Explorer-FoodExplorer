import { Field, ErrorMessage, useField } from 'formik'

const InputNewEdit = ({ name, type, label, placeholder }) => {
    const [field, meta, helpers] = useField(name)
    const hasValue = field.value !== ''

    const handleInputChange = (event) => {
        helpers.setValue(event.target.value)
    }

    return (
        <div className="flex flex-col gap-3 pt-0 md:pt-8 w-full">
            <label
                htmlFor={name}
                className="text-light-400 font-roboto text-base leading-4 w-full"
            >
                {label}
            </label>
            <Field
                className={`bg-dark-800 py-3 px-[14px] rounded-lg w-full appearance-none ${
                    hasValue ? 'text-light-100' : 'text-light-500'
                }`}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleInputChange}
                initialTouched={meta.touched}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs"
            />
        </div>
    )
}

export default InputNewEdit
