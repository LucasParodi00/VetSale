
export const ItemProducto = ( { productos } ) => {

    const { codProducto, edades, mascotas, nombre, stock, precioContado, precioLista, precioSuelto } = productos;
    return (  
        <div className="itemProductoContenedor"
        
        > {/* dividido en 7 columnas */}
            <div className="infoProducto"> {/* primer columna: se divide en dos filas; nombre, categoria y edad */}
                <p> <b>{ codProducto }</b> | { nombre }</p>
                <p>Mascota: <span>{ mascotas }</span> Edad: <span> { edades } </span></p>
            </div>
            <div> {/* stock */ }
                <p>Stock: <span> { stock }</span></p>
            </div>
            <div> {/* precio contado; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precioContado }</span>
            </div>
            <div> {/* precio Lista; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precioLista }</span>
            </div>
            <div> {/* precio suelto; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precioSuelto } </span>
            </div>
            <div> {/* tacho basurero */}
                <i className="fa-regular fa-trash-can"></i>
            </div>
            <div> {/* lapiz */}
                <i className="fa-solid fa-pencil"></i>
            </div>            
        </div>
    );
};