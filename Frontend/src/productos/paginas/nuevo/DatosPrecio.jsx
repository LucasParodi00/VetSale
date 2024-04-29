import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validacion } from "../../../componetes/validaciones";
import { setProducto } from "../../../api/productos/productosApi";


export const DatosPrecio = ({ nuevoProducto, setNuevoProducto, progreso, setProgreso }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (progreso < 2) {
            console.log(progreso);
            navigate('/productos');
        }
    }, [progreso, navigate]);

    const [estado, setEstado] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: nuevoProducto });

    const handleEstado = (event) => {
        setEstado(event.target.value)
    }

    const onSubmit = async ({ stock, precioContado, precioLista, precioSuelto }) => {
        const productoActualizado = { ...nuevoProducto, stock, precioContado, precioLista, precioSuelto, estado }
        setNuevoProducto(productoActualizado)
        try {
            const mensaje = await Promise.race([
                setProducto(productoActualizado),
                new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera excedido'), 10000))
            ]);
            navigate('../4', { state: { mensaje } })
        } catch (error) {
            navigate('../4', { state: { mensaje: 'No se pudo cargar el producto:  ' + error.message } })
        }
    }

    return (
        <Box component={'section'} sx={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={10}>

                    <Grid item container spacing={4}>
                        <Grid item>
                            <TextField
                                label='Stock' error={!!errors.stock}
                                {...register('stock', validacion.stock)}
                                helperText={errors.stock?.message} />
                        </Grid>
                        <Grid item>
                            <Select
                                onChange={handleEstado}
                                value={estado}>
                                <MenuItem value={1} > Activo </MenuItem>
                                <MenuItem value={0} > Inactivo </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={1}>
                        <Grid item>
                            <TextField
                                label='precioContado'
                                {...register('precioContado', validacion.peso)}
                                error={!!errors.peso}
                                helperText={errors.peso?.message} />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='precioLista'
                                {...register('precioLista', validacion.peso)}
                                error={!!errors.peso}
                                helperText={errors.peso?.message} />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='precioSuelto'
                                {...register('precioSuelto', validacion.peso)}
                                error={!!errors.peso}
                                helperText={errors.peso?.message} />
                        </Grid>
                    </Grid>
                </Grid>
                <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Button onClick={() => navigate('../2')} variant="contained"> Atras </Button>
                    <Button type="submit" variant="contained"> Cargar </Button>
                </Box>
            </form>
        </Box>
    );
};