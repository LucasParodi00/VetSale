import axios from "axios";



export const productosApi = axios.create({
    baseURL: 'http://localhost:4000',

})

export const setProducto = async (nuevoProducto) => {
    try {
        const responce = await productosApi.post('/producto', nuevoProducto)
        return responce.data.message;
    } catch (error) {
        return error
    }
}

export const getProductos = async (codProducto) => {
    try {
        const { data } = await productosApi.get(`/producto/${codProducto}`)
        return data;
    } catch (error) {
        return error
    }
}

