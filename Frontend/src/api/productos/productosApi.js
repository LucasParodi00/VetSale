import axios from "axios";



export const productosApi = axios.create({
    baseURL: 'http://localhost:4000'
})

export const setProducto = async (nuevoProducto) => {
    if (nuevoProducto.codTamanio == '') {
        delete nuevoProducto.codTamanio
    }
    try {
        console.log(nuevoProducto);
        const responce = await productosApi.post('/producto', nuevoProducto)
        return responce.data;
    } catch (error) {
        return error.message
    }
}