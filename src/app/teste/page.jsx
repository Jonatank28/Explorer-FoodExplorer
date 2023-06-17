'use client'
import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
    })

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            return
        }

        setLoading(true)

        const formData = new FormData()
        formData.append('dishImage', selectedFile)
        formData.append('name', data.name)
        formData.append('description', data.description)

        try {
            const response = await axios.post(
                'http://localhost:3333/api/teste',
                formData
            )

            console.log('Image uploaded successfully:', response.data)
            // Faça algo com a resposta do servidor, se necessário
        } catch (error) {
            console.error('Error uploading image:', error)
            // Lide com o erro, se necessário
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Nome"
            />
            <input
                type="text"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                placeholder="Descrição"
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                Upload
            </button>
        </div>
    )
}

export default ImageUpload
