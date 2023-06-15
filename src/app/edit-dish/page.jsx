'use client'
import { api } from '@/services/api'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import InputNewEdit from '@/components/Form/InputNewEdit'
import SelectNewEdit from '@/components/Form/SelectNewEdit'
import TextAreaNewEdit from '@/components/Form/AreaNewEdit'
import TagIngredient from '@/components/TagIngredient'
import IconUpload from '@/icon/IconUpload'

const EditDish = () => {
    const { sidebarOpen, permission, setFixedFooter, user } =
        useContext(AuthContext)
    const [data, setData] = useState(null)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getFoodSelect = async () => {
        try {
            const response = await api.get(`/foods-select/${id}`)
            console.log(response.data)

            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email inválido')
            .required('Campo obrigatário'),
        password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('Campo obrigatário'),
    })

    const handleSubmit = (values) => {
        console.log('🚀 ~ values:', values)
    }

    const options = [
        { value: 'refeicoes', label: 'Refeições' },
        { value: 'sobremesas', label: 'Sobremesas' },
        { value: 'bebidas', label: 'Bebidas' },
    ]

    useEffect(() => {
        setFixedFooter(false)
        getFoodSelect()
    }, [])

    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <div className=" w-default mx-auto cursor-pointer px-4 md:px-0">
                        <div className="pt-4 md:pt-6 ">
                            <Link
                                href="/"
                                className="font-poppins text-light-300 font-normal md:font-bold md:text-2xl pl-2 md:pl-0"
                            >
                                {'< '}Voltar
                            </Link>
                        </div>

                        <h1 className="text-light-300 font-poppins font-medium text-2xl leading-10 mt-6">
                            Editar prato
                        </h1>
                        <Formik
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            <Form className="pt-8">
                                <div className="flex flex-col md:flex-row gap-8 items-end w-full">
                                    <div className="w-full md:w-auto">
                                        <div>
                                            <label
                                                htmlFor="upload"
                                                className="text-light-400 font-roboto text-base leading-4"
                                            >
                                                Imagem do prato
                                            </label>
                                            <div className="flex items-center gap-2 py-[9px] bg-dark-800 rounded-lg w-full md:w-[230px] justify-center cursor-pointer mt-[9px]">
                                                <IconUpload
                                                    width={30}
                                                    height={30}
                                                    className="text-light-100"
                                                />
                                                <span className="text-light-100 text-sm font-poppins font-medium leading-6">
                                                    Selecione imagem
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <InputNewEdit
                                        name="name"
                                        placeholder="Salada Ceasar"
                                        label="Nome"
                                        type="text"
                                    />
                                    <SelectNewEdit
                                        name="categoria"
                                        placeholder="Refeição"
                                        label="Categoria"
                                        options={options}
                                    />
                                </div>
                                <div className="flex flex-col w-full md:w-auto  md:grid justify-end md:grid-cols-5 gap-7 md:gap-4 items-end">
                                    <div className="md:col-span-4 w-full md:w-auto mt-7 md:mt-0">
                                        <label
                                            htmlFor="upload"
                                            className="text-light-400 font-roboto text-base leading-4"
                                        >
                                            Ingredientes
                                        </label>
                                        <div className=" bg-dark-800 py-[7px] px-[14px] rounded-lg appearance-none mt-[9px]">
                                            <TagIngredient title="Pão Naan" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 w-full md:w-auto">
                                        <InputNewEdit
                                            name="price"
                                            placeholder="R$ 00,00"
                                            label="Preço"
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextAreaNewEdit
                                        name="description"
                                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                        label="Descrição"
                                    />
                                </div>
                                <div className="flex justify-end items-center gap-8">
                                    <button className="text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-dark-800 rounded-md mt-7 mb-28">
                                        Excluir prato
                                    </button>
                                    <button className="text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-tints-Tomato400 rounded-md mt-7 mb-28">
                                        Salvar alterações
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                )}
                <Footer />
            </main>
        )
    )
}

export default EditDish
