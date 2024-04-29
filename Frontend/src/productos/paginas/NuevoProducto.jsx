import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Container, Grid, Typography } from "@mui/material";
import { DatosCategoria, DatosMascota, DatosPrecio, DatosPrincipal, FinNuevoProducto } from "./";
import { Route, Routes } from "react-router-dom";
import { ExpandMore, ShoppingBag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { valoresCard } from "../hooks/case";
import { setProducto } from "../../api/productos/productosApi";
import { CardProducto } from "../componentes/CardProducto";

export const NuevoProducto = ({ producto }) => {
    const [nuevoProducto, setNuevoProducto] = useState({
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
        precioSuelto: ''
    });
    const [progreso, setProgreso] = useState(0)
    const theme = useTheme();
    const { root } = theme;

    useEffect(() => {
        if (producto) {
            setNuevoProducto(producto)
        }

    }, [nuevoProducto])



    return (
        <Container sx={{ backgroundColor: `${root.verdeClaro}`, padding: '1rem', margin: '1rem auto', borderRadius: '.5rem', minHeight: '60vh' }}>
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