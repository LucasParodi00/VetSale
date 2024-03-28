


export const ItemProducto = ({productos}) => {

    const { codProducto, edad, mascota, nombre, stock, precio_contado, precio_lista, precio_suelto } = productos;
    return (  
        <div className="itemProductoContenedor"
        
        > {/* dividido en 7 columnas */}
            <div className="infoProducto"> {/* primer columna: se divide en dos filas; nombre, categoria y edad */}
                <p> <b>{ codProducto }</b> | { nombre }</p>
                <p>Mascota: <span>{ mascota }</span> Edad: <span> { edad } </span></p>
            </div>
            <div> {/* stock */ }
                <p>Stock: <span> { stock }</span></p>
            </div>
            <div> {/* precio contado; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precio_contado }</span>
            </div>
            <div> {/* precio Lista; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precio_lista }</span>
            </div>
            <div> {/* precio suelto; se divide en dos filas. */}
                <p>Contado</p> 
                <span> $ { precio_suelto } </span>
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