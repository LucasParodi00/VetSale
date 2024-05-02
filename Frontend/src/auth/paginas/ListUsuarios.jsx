import { Box, Container, Grid, Typography } from "@mui/material";
import { ContenedorLayout } from "../../layout/";
import { Buscador, ButonAmarillo, ButonVerde, SectionHeader } from "../../componetes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsuarios } from "../../api/usuariosApi";
import { ItemUsuario } from "../componentes";




export const ListUsuarios = () => {
    const [eliminados, setEliminados] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const usuariosEliminados = () => {
        eliminados
        console.log('Usuarios eliminados');
    }

    const buscarUsuario = () => {
        console.log('Buscando Usuario');
    }

    useEffect(() => {
        const listaUsuarios = async () => {
            try {
                const resultadoUsuarios = await getUsuarios();
                setUsuarios(resultadoUsuarios);
                console.log(resultadoUsuarios);
            }
            catch (error) {
                console.log('Error al cargar los usuarios');
            } finally {
                setCargando(false)
            }
        }
        listaUsuarios()
    }, [])

    return (
        <Container>
            <SectionHeader>
                <Buscador parametro='usuarios' onChange={buscarUsuario} />
                <Box>
                    <Link to={'nuevo'}> <ButonVerde> Nuevo Usuario </ButonVerde> </Link>
                    <ButonAmarillo onClick={usuariosEliminados}> {eliminados ? 'Eliminados' : 'Activos'} </ButonAmarillo>
                </Box>
            </SectionHeader>
            {cargando ? <div>Cargando los usuarios </div> :
                <div className="scroll">
                    {
                        usuarios.map((usuario) => {
                            return <ItemUsuario key={usuario.codUsuario} usuario={usuario} />
                        })
                    }
                </div>
            }
        </Container >
    );
}