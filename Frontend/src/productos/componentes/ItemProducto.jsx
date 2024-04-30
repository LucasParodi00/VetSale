import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteProducto } from "../../api/productos/productosApi";


export const ItemProducto = ({ productos, verProducto, productoEstado }) => {
    const { codProducto, nombre, stock, precioContado, precioLista, precioSuelto, nombreMascotas, nombreEdades } = productos;

    const eliminarProducto = async () => {
        const responce = await deleteProducto(codProducto);
        console.log(responce);
        // return deleteProducto;
    }



    return (
        <div className="itemProductoContenedor">
            <div className="infoProducto" onClick={() => verProducto(productos)}>
                <p> <b>{codProducto}</b> | {nombre}</p>
                <p>Mascota: <span>{nombreMascotas}</span> Edad: <span> {nombreEdades} </span></p>
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
                <Link
                    to={'/productos/nuevo'} state={{ codProducto: codProducto }}
                >
                    <Button><ModeEdit color="" /></Button>
                </Link>
            </div>
            <div> {/* lapiz */}
                <Button onClick={eliminarProducto}><DeleteForever sx={{ color: productoEstado ? 'red' : 'green' }} /> </Button>
            </div>

        </div >
    );
};