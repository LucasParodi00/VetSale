import { Button, Input } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { productosApi } from "../api/productos/productosApi";




export const CargaImagen = () => {

    const { register, handleSubmit } = useForm();

    const [imagen, setImagen] = useState({});

    const onSubmit = async ({ imagen }) => {
        const formData = new FormData();
        formData.append('imagen', imagen[0])


        const respuesta = productosApi.post('/storage', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(respuesta);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('imagen')}
                type="file"
            />
            <Button type="submit">Enviar</Button>
        </form>
    )
}