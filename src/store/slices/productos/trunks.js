import { productosApi } from "../../../api/productos/productosApi";
import { cargandoProductos, setProductos } from "./productosSlice"



export const getProductos = () => {
    return async ( dispatch ) => {
        dispatch ( cargandoProductos() );

        const { data } = await productosApi.get ()
        
        dispatch ( setProductos ( { productos: data } ))
    }

}