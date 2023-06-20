'use client'
import { AuthContext } from '@/context/authContext'
import { foodContext } from '@/context/foodContext'
import { useContext, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import InputNewEdit from '@/components/Form/InputNewEdit'
import SelectNewEdit from '@/components/Form/SelectNewEdit'
import TextAreaNewEdit from '@/components/Form/AreaNewEdit'
import TagIngredient from '@/components/TagIngredient'
import UploadFile from '@/components/Form/UploadFile'
import { api } from '@/services/api'
import Toaster from '@/components/Toaster'
import { useRouter } from 'next/navigation'

const AddDish = () => {
    const router = useRouter()
    const { sidebarOpen, permission, setFixedFooter, newTag, setNewTag } =
        useContext(AuthContext)
    const { getFoods } = useContext(foodContext)
    const [tags, setTags] = useState([])
    const [error, setError] = useState({
        status: false,
        message: '',
        name: '',
    })
    const [showToaster, setShowToaster] = useState({
        status: false,
        message: '',
        tag: '',
    })

    //! Valores iniciais
    const initialValues = {
        name: '',
        category: {
            value: 0,
            label: '',
        },
        price: '',
        description: '',
        dishImage: '',
    }

    //! Validação do formulário
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

    //! Select
    const options = [
        { value: 1, label: 'Refeições' },
        { value: 2, label: 'Sobremesas' },
        { value: 3, label: 'Bebidas' },
    ]

    //! Adiciona tag
    const handleAddTag = () => {
        if (newTag === '') {
            setError({
                status: true,
                message: 'Campo vazio',
                name: 'tags',
            })
            setTimeout(() => {
                setError(false)
            }, 1500)
        }
        if (newTag.length > 0) {
            setError(false)
            setTags((prevState) => [...prevState, newTag])
            setNewTag('')
        }
    }

    //! Remove tag
    const handleRemoveTag = (index) => {
        setTags((prevState) => prevState.filter((_, i) => i !== index))
    }

    //! Envia dados para a api
    const handleSubmit = async (values) => {
        const valuesTotal = {
            ...values,
            tags,
            category: values.category.value,
        }
        if (tags.length == 0) {
            setError({
                status: true,
                message: 'Adicione pelo menos uma tag',
                name: 'tags',
            })
            setTimeout(() => {
                setError(false)
            }, 1500)
        }
        if (values.category.value === 0) {
            setError({
                status: true,
                message: 'Selecione uma categoria',
                name: 'category',
            })
            setTimeout(() => {
                setError(false)
            }, 1500)
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('category', values.category.value)
            formData.append('price', values.price)
            formData.append('description', values.description)
            formData.append('dishImage', values.dishImage)

            tags.forEach((tag) => {
                formData.append('tags', tag)
            })

            const response = await api.patch('foods/create', formData)

            if (response.status === 200) {
                setShowToaster({
                    status: true,
                    message: 'Prato adicionado com sucesso',
                    tag: 'success',
                })
                getFoods()
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            }
        } catch (error) {
            setShowToaster({
                status: true,
                message: 'Erro ao adicionar prato',
                tag: 'error',
            })
            setTimeout(() => {
                setShowToaster({
                    status: false,
                    message: '',
                    tag: '',
                })
            }, 4000)
        }
    }

    //! Footer fixo
    useEffect(() => {
        setFixedFooter(false)
    }, [])

    return (
        permission && (
            <main className="">
                <Header />
                {showToaster.status && (
                    <Toaster
                        message={showToaster.message}
                        tag={showToaster.tag}
                    />
                )}
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
                                        errorSelect={error}
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
                                        <div className=" bg-dark-800 py-[7px] flex flex-wrap gap-2 px-[14px] rounded-lg appearance-none mt-[9px]">
                                            {tags &&
                                                tags.map((item, index) => (
                                                    <TagIngredient
                                                        title={item}
                                                        isNew={false}
                                                        key={index}
                                                        onClick={() =>
                                                            handleRemoveTag(
                                                                index
                                                            )
                                                        }
                                                    />
                                                ))}
                                            <TagIngredient
                                                title="Adicionar"
                                                isNew={true}
                                                value={newTag}
                                                onClick={handleAddTag}
                                                errorTag={error}
                                            />
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

                                <TextAreaNewEdit
                                    name="description"
                                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                    label="Descrição"
                                />
                                <div className="flex justify-end items-center ">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-tints-Tomato400 hover:bg-tints-Tomato300  transition-colors rounded-md mt-7 mb-28"
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
