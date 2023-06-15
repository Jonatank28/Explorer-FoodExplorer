'use client'
import { Form } from 'formik'
import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/authContext'

const FormOne = ({ title, baseboard, textButton, children, link }) => {
    const { errorReq } = useContext(AuthContext)

    return (
        <Form className={`md:bg-dark-700 p-0 md:p-16 md:rounded-2xl`}>
            <div className="">
                <h1 className="font-poppins font-medium text-[32px] text-light-100 leading-relaxed hidden md:block">
                    {title}
                </h1>
            </div>
            {children}
            {errorReq && (
                <p className="text-red-400 text-xs pt-4">{errorReq}</p>
            )}
            <button
                type="submit"
                className="text-light-100 font-poppins font-medium leading-6 w-full bg-tints-Tomato100 py-3 px-8 rounded-[5px] mt-8"
            >
                {textButton}
            </button>
            <Link
                href={link}
                className="text-light-100 font-poppins font-medium text-sm leading-6 text-center mt-8 block"
            >
                {baseboard}
            </Link>
        </Form>
    )
}

export default FormOne
