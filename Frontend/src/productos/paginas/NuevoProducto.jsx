import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Container, Grid, Typography } from "@mui/material";
import { DatosCategoria, DatosMascota, DatosPrecio, DatosPrincipal } from "./";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ExpandMore, ShoppingBag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { valoresCard } from "../hooks/case";

export const NuevoProducto = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        codCategoria: '',
        stock: '',
        cantidad: '',
        codTamanio: '',
        mililitro: '',
        codMascotas: '',
        codEdades: '',
        precioContado: '',
        precioLista: '',
        precioSuelto: ''
    });
    const [expanded, setExpanded] = useState(false);
    const [progreso, setProgreso] = useState(0)
    const theme = useTheme();

    const { root } = theme;
    const { nombre, descripcion, codCategoria, stock, cantidad, codTamanio, mililitro, codMascotas, codEdades, imagen, precioContado, precioLista, precioSuelto } = nuevoProducto;

    const [retorno, setRetorno] = useState(valoresCard(codCategoria, codMascotas, codEdades, codTamanio))
    const [c, m, e, t] = retorno;


    useEffect(() => {
        setRetorno(valoresCard(codCategoria, codMascotas, codEdades, codTamanio))
        setProgreso(progreso + 1)
    }, [nuevoProducto])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container sx={{ backgroundColor: `${root.verdeClaro}`, padding: '1rem', margin: '1rem auto', borderRadius: '.5rem', minHeight: '60vh' }}>
            <Typography variant="h1" textAlign={'center'} sx={{ fontSize: '3rem', fontWeight: 'bold' }}> Nuevo Producto </Typography>
            <Grid container spacing={1} sx={{ padding: '1.5rem', placeItems: 'center', minHeight: '60vh' }}>
                <Grid item sm={8}>
                    <Routes>
                        <Route path="" element={<DatosPrincipal nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} />} />
                        <Route path="categoria" element={<DatosCategoria nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} />} />
                        <Route path="mascota" element={<DatosMascota nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} />} />
                        <Route path="precios" element={<DatosPrecio nuevoProducto={nuevoProducto} setNuevoProducto={setNuevoProducto} />} />
                    </Routes>
                </Grid>
                <Grid item sm={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar> <ShoppingBag /> </Avatar>
                            }
                            title={nombre}
                            subheader={c}
                        />
                        <CardContent>
                            <Typography> Stock: <b>{stock}</b> </Typography>
                            <Typography> Tamaño: <b>{t}</b> </Typography>
                            <Typography> Cantidad: <b>{cantidad}</b> </Typography>
                            <Typography> Mililitro: <b>{mililitro}</b> </Typography>
                            <Typography> Para: <b>{m}</b> </Typography>
                            <Typography> Edad: <b>{e}</b> </Typography>
                            <hr />
                            <Typography> Precio Contado: <b>$ {precioContado}</b> </Typography>
                            <Typography> Precio Lista: <b>$ {precioLista}</b> </Typography>
                            <Typography> Precio Suelto: <b>$ {precioSuelto}</b> </Typography>
                        </CardContent>

                        <CardActions>
                            <ExpandMore expand={expanded.toString()} onClick={handleExpandClick} aria-expanded={expanded} aria-label="Descripcion"><ExpandMore /></ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {descripcion}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    )
}