'use client'
import FormOne from '@/components/Form/FormOne'
import { Formik } from 'formik'
import Image from 'next/image'
import * as Yup from 'yup'
import Input from '@/components/Form/Input'
import { AuthContext } from '@/context/authContext'
import { useContext } from 'react'

const Register = () => {
    const { registerUser } = useContext(AuthContext)

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
            .email('Email inválido')
            .required('Campo obrigatório'),
        password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('Campo obrigatório'),
    })

    const handleSubmit = async (values) => {
        const name = values.name
        const email = values.email
        const password = values.password
        registerUser(name, email, password)
    }

    return (
        <main className="h-screen w-screen flex flex-col justify-center items-center md:flex-row gap-12">
            <div className="w-full flex justify-center items-center">
                <Image
                    src="/IconeLogo.svg"
                    alt="Logo do food explorer"
                    width={300}
                    height={300}
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <FormOne
                        title="Crie sua conta"
                        baseboard="Já tenho uma conta"
                        textButton="Criar conta"
                        link="/login"
                    >
                        <Input
                            name="name"
                            type="str"
                            label="Seu nome"
                            placeholder="Exemplo: Maria da Silva"
                        />
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Exemplo: exemplo@exemplo.com.br"
                        />
                        <Input
                            name="password"
                            type="password"
                            label="Senha"
                            placeholder="No mínimo 6 caracteres"
                        />
                    </FormOne>
                </Formik>
            </div>
        </main>
    )
}

export default Register
