import { useTheme } from "@emotion/react";
import { CardMedia, Checkbox, Container, FormControlLabel, Grid, Typography } from "@mui/material";
import { ContenedorLayout } from "../../layout/ContenedorLayout";
import { ButonAzul, InputBlanco } from "../../componetes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const theme = useTheme()
    const { root } = theme;

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log('eviando: ', values);
        navigate('./productos')
    }
    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ContenedorLayout>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            sx={{
                                bgcolor: '#FFFFFF',
                                borderRadius: '2rem'
                            }}
                        >
                            <Grid item sm={6} bgcolor={root.azulVerdoso} padding={10} sx={{ borderRadius: '2rem  0rem 0rem 2rem' }}>
                                <Typography variant="h1" sx={{ fontSize: '5rem' }} textAlign={"center"}> Iniciar Sesion </Typography>
                                <Grid marginTop={5}>
                                    <InputBlanco {...register('usuario')} label="Usuario" fullWidth />
                                </Grid>
                                <Grid marginTop={4}>
                                    <InputBlanco {...register('password')} label="Password" fullWidth type="password" />
                                </Grid>
                                <Grid marginTop={10}>
                                    <FormControlLabel control={<Checkbox />} label="Manetener la sesion iniciada" />
                                </Grid>
                                <Grid marginTop={10} textAlign='center'>
                                    <ButonAzul type="submit">Iniciar Sesion</ButonAzul>
                                </Grid>
                            </Grid>
                            <Grid item sm={6} padding={1}>
                                <CardMedia component='img' alt="Vet Safe" image="../../../img/logo.jpeg" />
                            </Grid>
                        </Grid>
                    </form>
                </ContenedorLayout>
            </Container>
        </>


    );
};