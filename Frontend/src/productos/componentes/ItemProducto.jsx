import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Button } from "@mui/material";


export const ItemProducto = ({ productos, verProducto, productoEstado }) => {
    const { codProducto, edades, mascotas, nombre, stock, precioContado, precioLista, precioSuelto } = productos;

    return (
        <div className="itemProductoContenedor animate__animated animate__bounceInRight"

        > {/* dividido en 7 columnas */}
            <div className="infoProducto" onClick={() => verProducto(productos)}>
                <p> <b>{codProducto}</b> | {nombre}</p>
                <p>Mascota: <span>{mascotas}</span> Edad: <span> {edades} </span></p>
            </div>
            <div> {/* stock */}
                <p>Stock: <span> {stock}</span></p>
            </div>
            <div> {/* precio contado; se divide en dos filas. */}
                <p>Contado</p>
                <span> $ {precioContado}</span>
            </div>
            <div> {/* precio Lista; se divide en dos filas. */}
                <p>Contado</p>
                <span> $ {precioLista}</span>
            </div>
            <div> {/* precio suelto; se divide en dos filas. */}
                <p>Contado</p>
                <span> $ {precioSuelto} </span>
            </div>
            <div> {/* tacho basurero */}
                <Button><ModeEdit color="" /></Button>
            </div>
            <div> {/* lapiz */}
                <Button><DeleteForever sx={{ color: productoEstado ? 'red' : 'green' }} /> </Button>
            </div>

        </div>
    );
};