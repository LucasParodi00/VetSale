DELIMITER //
CREATE PROCEDURE ModificarProducto(IN productoJSON JSON)
BEGIN 
    -- Extraer los valores del JSON
    SET @codProducto = JSON_EXTRACT(productoJSON, '$.codProducto');
    SET @codCategoria = JSON_EXTRACT(productoJSON, '$.codCategoria');
    SET @codTamanio = IF(JSON_EXTRACT(productoJSON, '$.codTamanio') = '', NULL, JSON_EXTRACT(productoJSON, '$.codTamanio'));
    SET @nombre = JSON_EXTRACT(productoJSON, '$.nombre');
    SET @descripcion = JSON_EXTRACT(productoJSON, '$.descripcion');
    SET @peso = IF(JSON_EXTRACT(productoJSON, '$.peso') = '', NULL, JSON_EXTRACT(productoJSON, '$.peso'));
    SET @mililitro = IF(JSON_EXTRACT(productoJSON, '$.mililitro') = '', NULL, JSON_EXTRACT(productoJSON, '$.mililitro'));
    SET @cantidad = IF(JSON_EXTRACT(productoJSON, '$.cantidad') = '', NULL, JSON_EXTRACT(productoJSON, '$.cantidad'));
    SET @imagen = IF(JSON_EXTRACT(productoJSON, '$.imagen') = '', NULL, JSON_EXTRACT(productoJSON, '$.imagen'));
    SET @stock = JSON_EXTRACT(productoJSON, '$.stock');
    SET @precioContado = JSON_EXTRACT(productoJSON, '$.precioContado');
    SET @precioLista = JSON_EXTRACT(productoJSON, '$.precioLista');
    SET @precioSuelto = JSON_EXTRACT(productoJSON, '$.precioSuelto');
    SET @codEdades = JSON_EXTRACT(productoJSON, '$.codEdades');
    SET @codMascotas = JSON_EXTRACT(productoJSON, '$.codMascotas');

    -- Actualizar la tabla producto
    UPDATE producto
    SET codCategoria = @codCategoria,
        codTamanio = @codTamanio,
        nombre = @nombre,
        descripcion = @descripcion,
        peso = @peso,
        mililitro = @mililitro,
        cantidad = @cantidad,
        imagen = @imagen,
        stock = @stock,
        precioContado = @precioContado,
        precioLista = @precioLista,
        precioSuelto = @precioSuelto
    WHERE codProducto = @codProducto;

    -- Borrar las relaciones existentes en las tablas producto_edad y producto_mascota
    DELETE FROM producto_edad WHERE codProducto = @codProducto;
    DELETE FROM producto_mascota WHERE codProducto = @codProducto;

    -- Insertar las nuevas relaciones en las tablas producto_edad y producto_mascota
    SET @i = 0;
    WHILE @i < JSON_LENGTH(@codEdades) DO
        INSERT INTO producto_edad (codProducto, codEdad) VALUES (@codProducto, JSON_EXTRACT(@codEdades, CONCAT('$[', @i, ']')));
        SET @i = @i + 1;
    END WHILE;

    SET @i = 0;
    WHILE @i < JSON_LENGTH(@codMascotas) DO
        INSERT INTO producto_mascota (codProducto, codMascota) VALUES (@codProducto, JSON_EXTRACT(@codMascotas, CONCAT('$[', @i, ']')));
        SET @i = @i + 1;
    END WHILE;
END // 
DELIMITER ;

