import { Field, ErrorMessage } from 'formik'

const Input = ({ name, type, label, placeholder }) => {
    return (
        <div className="flex flex-col gap-2 pt-8">
            <label
                htmlFor={name}
                className="text-light-400 font-roboto text-base leading-4"
            >
                {label}
            </label>
            <Field
                className="bg-dark-900 py-3 px-[14px] w-[300px] md:w-[348px] rounded-lg text-light-500"
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs"
            />
        </div>
    )
}

export default Input
