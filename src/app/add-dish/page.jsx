'use client'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

import Link from 'next/link'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import IconUpload from '@/icon/IconUpload'
import InputNewEdit from '@/components/Form/InputNewEdit'
import SelectNewEdit from '@/components/Form/SelectNewEdit'
import TextAreaNewEdit from '@/components/Form/AreaNewEdit'
import TagIngredient from '@/components/TagIngredient'
import UploadFile from '@/components/Form/UploadFile'

const AddDish = ({ categories }) => {
    const { sidebarOpen, permission, setFixedFooter, newTag, setNewTag } =
        useContext(AuthContext)
    const [tags, setTags] = useState([])
    const [errorTag, setErrorTag] = useState(false)

    //! Valores iniciais
    const initialValues = {
        name: '',
        category: {
            value: 0,
            label: '',
        },
        price: '',
        description: '',
    }

    //! Validação formulário
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        category: Yup.object()
            .shape({
                value: Yup.number(),
                label: Yup.string(),
            })
            .required('Campo obrigatório'),
        price: Yup.string().required('Campo obrigatório'),
        description: Yup.string().required('Campo obrigatório'),
        dishImage: Yup.string().required('Campo obrigatório'),
    })

    //! Envia dados para a api
    const handleSubmit = (values) => {
        console.log(values)
    }

    //! Select
    const options = [
        { value: 1, label: 'Refeições' },
        { value: 2, label: 'Sobremesas' },
        { value: 3, label: 'Bebidas' },
    ]

    useEffect(() => {
        setFixedFooter(false)
    }, [])

    const handleAddTag = () => {
        if (newTag === '') {
            setErrorTag(true)
            setTimeout(() => {
                setErrorTag(false)
            }, 1500)
        }
        if (newTag.length > 0) {
            setErrorTag(false)
            setTags((prevState) => [...prevState, newTag])
        }
        setNewTag('')
    }

    const handleRemoveTag = () => {}

    return (
        permission && (
            <main className="">
                <Header />
                {!sidebarOpen && (
                    <div className=" w-default mx-auto px-4 md:px-0">
                        <div className="pt-4 md:pt-6 ">
                            <Link
                                href="/"
                                className="font-poppins text-light-300 font-normal md:font-bold md:text-2xl pl-2 md:pl-0"
                            >
                                {'< '}Voltar
                            </Link>
                        </div>

                        <h1 className="text-light-300 font-poppins font-medium text-2xl leading-10 mt-6">
                            Novo prato
                        </h1>
                        <Formik
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            <Form className="pt-8">
                                <div className="flex flex-col md:flex-row gap-8 items-end w-full">
                                    <UploadFile
                                        name="dishImage"
                                        type="file"
                                        label="Imagem"
                                    />

                                    <InputNewEdit
                                        name="name"
                                        placeholder="Salada Ceasar"
                                        label="Nome"
                                        type="text"
                                    />
                                    <SelectNewEdit
                                        name="category"
                                        label="Categoria"
                                        options={options}
                                        placeholder="Selecione uma categoria"
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
                                        <div className=" bg-dark-800 py-[7px] flex gap-2 px-[14px] rounded-lg appearance-none mt-[9px]">
                                            {tags &&
                                                tags.map((item, index) => (
                                                    <TagIngredient
                                                        title={item}
                                                        isNew={false}
                                                        key={index}
                                                        onClick={
                                                            handleRemoveTag
                                                        }
                                                    />
                                                ))}
                                            <TagIngredient
                                                title="Adicionar"
                                                isNew={true}
                                                value={newTag}
                                                onClick={handleAddTag}
                                                errorTag={errorTag}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-1 w-full md:w-auto">
                                        <InputNewEdit
                                            name="price"
                                            placeholder="R$ 00,00"
                                            label="Preço"
                                            type="string"
                                        />
                                    </div>
                                </div>

                                <TextAreaNewEdit
                                    name="description"
                                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                    label="Descrição"
                                />
                                <div className="flex justify-end items-center ">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-tints-Tomato400 rounded-md mt-7 mb-28"
                                    >
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

export default AddDish
