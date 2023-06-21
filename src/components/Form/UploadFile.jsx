import { useRef, useState } from 'react'
import { Field, ErrorMessage, useField } from 'formik'
import IconUpload from '@/icon/IconUpload'

const UploadFile = ({ name, label, path }) => {
    const [field, meta, helpers] = useField(name)
    const hasValue = field.value !== ''

    const handleFileSelect = (event) => {
        const file = event.currentTarget.files[0]
        helpers.setValue(file)
    }

    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    return (
        <div className="" onClick={handleUploadClick}>
            {' '}
            <div>
                <label
                    htmlFor={name}
                    className="text-light-400 font-roboto text-base leading-4 w-full"
                >
                    {label}
                </label>
                <div className="bg-dark-800 flex items-center gap-2 py-[9px] rounded-lg w-full md:w-[350px] justify-center cursor-pointer mt-[9px]">
                    <input
                        type="file"
                        id={name}
                        name={name}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                    <IconUpload
                        width={28}
                        height={28}
                        className="text-light-100"
                    />
                    <span className="text-light-100 text-sm font-poppins font-medium leading-6">
                        {hasValue
                            ? field.value.name
                            : 'Nenhum arquivo selecionado'}
                        {path}
                    </span>
                </div>
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-400 text-xs absolute -bottom-5 right-0"
            />
        </div>
    )
}

export default UploadFile
