import { Container, Grid, Typography } from "@mui/material";
import { DatosCategoria, DatosMascota, DatosPrecio, DatosPrincipal, FinNuevoProducto } from "./";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

import { CardProducto } from "../componentes/CardProducto";
import { getProducto } from "../../api/productos/productosApi";

export const NuevoProducto = ({ producto }) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        codProducto: '',
        nombre: '',
        descripcion: '',
        codCategoria: '',
        stock: '',
        peso: '',
        cantidad: '',
        codTamanio: '',
        mililitro: '',
        codMascotas: '',
        codEdades: '',
        precioContado: '',
        precioLista: '',
        precioSuelto: '',
        imagen: {}
    });
    const [progreso, setProgreso] = useState(0)
    const theme = useTheme();
    const { root } = theme;
    const location = useLocation();
    const codProducto = location.state?.codProducto;
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const cargarProducto = async () => {
            if (codProducto) {
                const datosProducto = await getProducto(codProducto);
                setNuevoProducto(datosProducto);
                setLoading(false);
            } else {
                setLoading(false)
            }
        };
        cargarProducto();
    }, [codProducto]);

    useEffect(() => {
        if (producto) {
            setNuevoProducto(producto)
        }
    }, [nuevoProducto])


    if (loading) {
        return <div> Cargando wey.... </div>
    }


    return (
        <Container className="animate__animated animate__bounceInRight" sx={{ backgroundColor: `${root.verdeClaro}`, padding: '1rem', margin: '1rem auto', borderRadius: '.5rem', minHeight: '60vh' }}>
            <Typography variant="h1" textAlign={'center'} sx={{ fontSize: '3rem', fontWeight: 'bold' }}> Nuevo Producto | {progreso} / 3</Typography>
            <Grid container spacing={1} sx={{ padding: '1.5rem', placeItems: 'center', minHeight: '60vh' }}>
                <Grid item sm={8}>
                    <Routes>
                        <Route path="" element={<DatosPrincipal nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} progreso={progreso} setProgreso={setProgreso} />} />
                        <Route path="1" element={<DatosCategoria nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} progreso={progreso} setProgreso={setProgreso} />} />
                        <Route path="2" element={<DatosMascota nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} progreso={progreso} setProgreso={setProgreso} />} />
                        <Route path="3" element={<DatosPrecio nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} progreso={progreso} setProgreso={setProgreso} />} />
                        <Route path="4" element={<FinNuevoProducto nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} progreso={progreso} setProgreso={setProgreso} />} />
                    </Routes>
                </Grid>
                <Grid item sm={4}>
                    <CardProducto nuevoProducto={nuevoProducto} />
                </Grid>
            </Grid>
        </Container>
    )
}