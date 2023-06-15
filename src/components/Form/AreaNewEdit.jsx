import { Field, ErrorMessage, useField, useFormikContext } from 'formik'

const TextAreaNewEdit = ({ name, label, placeholder }) => {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const hasValue = field.value !== ''

    const handleInputChange = (event) => {
        setFieldValue(name, event.target.value)
    }

    const handleAutoResize = (event) => {
        event.target.style.height = '200px'
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    return (
        <div className="flex flex-col gap-3 pt-8 relative w-full">
            <label
                htmlFor={name}
                className="text-light-400 font-roboto text-base leading-4"
            >
                {label}
            </label>
            <Field
                as="textarea"
                className={`bg-dark-800 py-3 px-[14px] rounded-lg appearance-none resize-none h-[200px] ${
                    hasValue ? 'text-light-100' : 'text-light-500'
                }`}
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleInputChange}
                onInput={handleAutoResize}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs"
            />
        </div>
    )
}

export default TextAreaNewEdit
