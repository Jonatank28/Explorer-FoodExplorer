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
import { useRouter, useSearchParams } from 'next/navigation'
import Modal from '@/components/Modal'

const EditDish = () => {
    const { sidebarOpen, permission, setFixedFooter, newTag, setNewTag } =
        useContext(AuthContext)
    const { getFoods } = useContext(foodContext)
    const [tags, setTags] = useState([])
    const [openModalDelete, setOpenModalDelete] = useState(false)

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
    const [food, setFood] = useState(null)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()

    //! Valores iniciais
    const initialValues = {
        name: food?.name || '',
        category: {
            value: food?.categoriesID || 0,
            label:
                food?.categoriesID === 1
                    ? 'Refeições'
                    : food?.categoriesID === 2
                    ? 'Sobremesas'
                    : 'Bebidas',
        },
        price: food?.value || '',
        description: food?.description || '',
        dishImage: food?.imagePath || '',
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
            setTags((prevState) => [
                ...prevState,
                {
                    foodID: '',
                    food_ingredientsID: '',
                    ingrediente: newTag,
                    ingredientsID: '',
                },
            ])
            setNewTag('')
        }
    }

    //! Remove tag
    const handleRemoveTag = (index) => {
        setTags((prevState) => prevState.filter((_, i) => i !== index))
    }

    //! Deleta prato
    const handleClickDelete = async () => {
        console.log('delete')
        await api
            .delete(`/foods/delete/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setOpenModalDelete(false)
                    setShowToaster({
                        status: true,
                        message: response.data.message,
                        tag: 'success',
                    })
                    getFoods()
                    setTimeout(() => {
                        router.push('/')
                    }, 2000)
                }
            })
            .catch((error) => {
                setShowToaster({
                    status: true,
                    message: 'Erro ao deletar prato',
                    tag: 'error',
                })
                setTimeout(() => {
                    setShowToaster({
                        status: false,
                        message: '',
                        tag: '',
                    })
                }, 4000)
            })
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

            tags.map((tag) => {
                formData.append('tags', tag.ingrediente)
            })

            const response = await api.put(`foods/update/${id}`, formData)
            if (response.status === 200) {
                setShowToaster({
                    status: true,
                    message: response.data.message,
                    tag: 'success',
                })
                setTimeout(() => {
                    setShowToaster({
                        status: false,
                        message: '',
                        tag: '',
                    })
                }, 4000)
                getFoods()
            }
        } catch (error) {
            // console.log(error)
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

    //! Busca dados do prato selecionado
    const getFoodSelect = async () => {
        try {
            const response = await api.get(`/foods-select/${id}`)
            console.log(response.data)
            setFood(response.data.food[0])
            setTags(response.data.ingredients)
        } catch (error) {
            console.log(error)
        }
    }

    //! Footer fixo
    useEffect(() => {
        setFixedFooter(false)
        getFoodSelect()
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
                {!sidebarOpen && food && (
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
                            Editar prato
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
                                        path={food?.path}
                                    />

                                    <InputNewEdit
                                        name="name"
                                        placeholder="Salada Ceasar"
                                        defaultValue={food?.name}
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
                                        <div className=" bg-dark-800 py-[7px] flex flex-wrap gap-2 md:px[25px] md:px-[14px] rounded-lg appearance-none mt-[9px] justify-center md:justify-start ">
                                            {tags &&
                                                tags.map((item, index) => (
                                                    <TagIngredient
                                                        title={item.ingrediente}
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
                                <div className="flex justify-end items-center gap-8 mb-0 md:mb-44">
                                    <button
                                        type="button"
                                        onClick={() => setOpenModalDelete(true)}
                                        className="text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-dark-800 hover:bg-dark-700 transition-colors rounded-md mt-7 mb-28"
                                    >
                                        Excluir prato
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-light-100 font-poppins font-medium leading-6 px-6 py-3 text-sm bg-tints-Tomato400 hover:bg-tints-Tomato300  transition-colors rounded-md mt-7 mb-28"
                                    >
                                        Salvar alterações
                                    </button>
                                    {openModalDelete && (
                                        <Modal
                                            title="Excluir prato"
                                            message="Tem certeza que deseja excluir esse prato?"
                                            onConfirm={handleClickDelete}
                                            isOpen={openModalDelete}
                                            onCancel={() =>
                                                setOpenModalDelete(false)
                                            }
                                        />
                                    )}
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
