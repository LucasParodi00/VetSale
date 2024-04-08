import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validacion } from "../../../componetes/validaciones";
import { setProducto } from "../../../api/productos/productosApi";


export const DatosPrecio = ({ nuevoProducto, setNuevoProducto }) => {
    const [estado, setEstado] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: nuevoProducto });
    const navigate = useNavigate();

    const handleEstado = (event) => {
        setEstado(event.target.value)
    }

    const onSubmit = async ({ stock, precioContado, precioLista, precioSuelto }) => {
        await setNuevoProducto({ ...nuevoProducto, stock, precioContado, precioLista, precioSuelto })
        try {
            const mensaje = await setProducto(nuevoProducto);
            navigate('/productos', { state: { mensaje } })
        } catch (error) {
            console.log(error);
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
                    <Button onClick={() => navigate('../mascota')} variant="contained"> Atras </Button>
                    <Button type="submit" variant="contained"> Siguiente </Button>
                </Box>
            </form>
        </Box>
    );
};