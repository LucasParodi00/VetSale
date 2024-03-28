import { ContenedorLayout, HeaderPageLayout } from "../layout";
import { Buscador } from "../../componets/Buscador";
import { ItemProducto } from "../componentes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductos } from "../../store/slices/productos/trunks";
import { ButtonComponent } from "../../componets";
import { ContenedorBotones } from "../layout";
import { Link } from "react-router-dom";

export const ListPage = () => {
    
    const dispatch = useDispatch ();

    const {isLoading, productos = []} = useSelector ( state => state.productos);

    useEffect ( ()=> {
        dispatch( getProductos() );
    }, []);

    return (
        <ContenedorLayout>
            <HeaderPageLayout>
                <Buscador parametro='un Producto' />
                <ContenedorBotones>
                    <ButtonComponent nombre='Eliminados' color='amarillo' ruta="productos/eliminados" />
                    <ButtonComponent nombre={'Nuevo producto'} color={'verde'} ruta="productos/nuevo"/>
                </ContenedorBotones>
            </HeaderPageLayout>   
            <div className="paginaScroll">
                { isLoading && <p className="loading">Cargando....</p>}
                {   
                    productos.map ( (p) => {
                        return <ItemProducto key={ p.codProducto } productos= {p}  />
                    } )
                }         
            </div>      
        </ContenedorLayout>

    );
};