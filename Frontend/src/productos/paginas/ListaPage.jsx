import { Box, Container } from "@mui/material";
import { ButonAmarillo, ButonVerde, SectionHeader } from "../../componetes";
import { Buscador } from "../../componetes/Buscador";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductos } from "../../redux/slices/productos/trunks";
import { ItemProducto } from "../componentes/ItemProducto";
import { Link, useLocation } from "react-router-dom";

export const ListaPage = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, productos = [] } = useSelector(state => state.productos)

    const mensaje = location.state?.mensaje
    useEffect(() => {
        dispatch(getProductos())
    }, []);



    return (
        <>
            <Container>
                <SectionHeader>
                    <Buscador parametro='un producto' />
                    <Box component='div' display={'flex'} gap={2}>
                        <Link to={'nuevo'}> <ButonVerde> Nuevo Producto </ButonVerde> </Link>
                        <ButonAmarillo> Eliminados </ButonAmarillo>
                    </Box>
                </SectionHeader>
                <div className="scroll">
                    {isLoading && <h4>Cargando productos...</h4>}
                    {
                        productos.map((p) => {
                            return <ItemProducto key={p.codProducto} productos={p} />
                        })
                    }
                </div>
            </Container>
        </>
    );
};