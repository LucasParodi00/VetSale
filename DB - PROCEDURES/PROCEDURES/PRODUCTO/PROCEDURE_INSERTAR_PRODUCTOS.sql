USE vet_sale;

DELIMITER //

CREATE PROCEDURE InsertarProducto(IN productoJSON JSON)
BEGIN 
    DECLARE nombre_producto VARCHAR(255);
    DECLARE cod_categoria INT;
    
    -- Obtener el nombre y la categoría del JSON
    SET nombre_producto = JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.nombre'));
    SET cod_categoria = JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.codCategoria'));
    
    -- Verificar si el nombre y la categoría son nulos o vacíos
    IF nombre_producto IS NULL OR nombre_producto = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El nombre del producto es obligatorio';
    END IF;
    
    IF cod_categoria IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El código de categoría del producto es obligatorio';
    END IF;

    -- Insertar el producto con los valores proporcionados
    INSERT INTO producto(codCategoria, codTamanio, nombre, descripcion, peso, mililitro, cantidad, estado, imagen, stock, precioContado, precioLista, precioSuelto)
    VALUES (
        cod_categoria,
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.codTamanio')),
        nombre_producto,
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.descripcion')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.peso')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.mililitro')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.cantidad')),
        true,
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.imagen')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.stock')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.precioContado')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.precioLista')),
        JSON_UNQUOTE(JSON_EXTRACT(productoJSON, '$.precioSuelto'))
    );
END //

DELIMITER ;




call BuscarProductos("nueva prueba");