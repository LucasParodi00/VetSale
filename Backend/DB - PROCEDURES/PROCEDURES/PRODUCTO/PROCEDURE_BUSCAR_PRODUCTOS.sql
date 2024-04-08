DELIMITER //
CREATE PROCEDURE BuscarProductos(IN param VARCHAR(255))
BEGIN
    SELECT p.codProducto, p.nombre, p.descripcion, p.peso, p.mililitro, p.cantidad, p.estado, p.imagen, p.stock, p.precioContado, p.precioLista, p.precioSuelto,
        c.nombreCategoria, c.codCategoria , 
        e.nombreEdad, e.codEdad, 
        m.nombreMascota, m.codMascota, 
        t.nombreTamanio, t.codTamanio
    FROM producto p
    LEFT JOIN categoria c ON c.codCategoria = p.codCategoria
    JOIN producto_edad pe ON pe.codProducto = p.codProducto
    JOIN producto_mascota pm ON pm.codProducto = p.codProducto
    LEFT JOIN mascota m ON m.codMascota = pm.codMascota
    LEFT JOIN edad e ON e.codEdad = pe.codEdad
    LEFT JOIN tamanio t ON t.codTamanio = p.codTamanio
    WHERE (p.codProducto = param OR p.nombre LIKE CONCAT('%', param, '%') OR c.nombreCategoria LIKE CONCAT('%', param, '%') OR m.nombreMascota LIKE CONCAT('%', param, '%') OR e.nombreEdad LIKE CONCAT('%', param, '%') OR param IS NULL OR param = '');
END //
DELIMITER ;

CALL BuscarProductos(29);

