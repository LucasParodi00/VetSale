import axios from "axios";



export const usuariosApi = axios.create({
    baseURL: 'http://localhost:4000'
});

export const getUsuarios = async () => {
    try {
        const { data } = await usuariosApi.get('/usuarios');
        return data;
    } catch (error) {
        return error;
    }
}

