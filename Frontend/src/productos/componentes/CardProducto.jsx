import { useEffect, useState } from "react";
import { valoresCard } from "../hooks/case";
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Typography } from "@mui/material";
import { ExpandMore, ShoppingBag } from "@mui/icons-material";

export const CardProducto = ({ nuevoProducto }) => {
    const {
        nombre, descripcion, stock, peso, cantidad, mililitro, precioContado, precioLista, precioSuelto,
        codCategoria, nombreCategoria,
        codTamanio, nombreTamanio,
        nombreMascotas, codMascotas,
        codEdades, nombreEdades
    } = nuevoProducto;

    const [expanded, setExpanded] = useState(false);
    const [retorno, setRetorno] = useState(valoresCard(codCategoria, codMascotas, codEdades, codTamanio))
    const [c, m, e, t] = retorno;


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        setRetorno(valoresCard(codCategoria, codMascotas, codEdades, codTamanio))
    }, [nuevoProducto])


    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar> <ShoppingBag /> </Avatar>
                }
                title={nombre}
                subheader={c + nombreCategoria ? nombreCategoria : ''}
            />
            <CardContent>
                <Typography> Stock: <b>{stock}</b> </Typography>
                <Typography> Peso: <b>{peso}</b> </Typography>
                <Typography> Tamaño: <b>{t + nombreTamanio ? nombreTamanio : ''}</b> </Typography>
                <Typography> Cantidad: <b>{cantidad}</b> </Typography>
                <Typography> Mililitro: <b>{mililitro}</b> </Typography>
                <Typography> Para: <b>{m + nombreMascotas ? nombreMascotas : ''}</b> </Typography>
                <Typography> Edad: <b>{e + nombreEdades ? nombreEdades : ''}</b> </Typography>
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
    )
}