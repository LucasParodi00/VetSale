USE vet_sale;

DELIMITER //
CREATE PROCEDURE InsertarProducto(IN productoJSON JSON)
BEGIN 
	INSERT INTO producto(codCategoria, codTamanio, nombre, descripcion, peso, mililitro, cantidad, estado, imagen, stock, precioContado, precioLista, precioSuelto)
    VALUES (
		JSON_EXTRACT(productoJSON, '$.codCategoria'),
        IF(JSON_EXTRACT(productoJSON, '$.codTamanio') = '', NULL, JSON_EXTRACT(productoJSON, '$.codTamanio')),
        JSON_EXTRACT(productoJSON, '$.nombre'),
        JSON_EXTRACT(productoJSON, '$.descripcion'),
        IF(JSON_EXTRACT(productoJSON, '$.peso') = '', NULL, JSON_EXTRACT(productoJSON, '$.peso')),
        IF(JSON_EXTRACT(productoJSON, '$.mililitro') = '', NULL, JSON_EXTRACT(productoJSON, '$.mililitro')),
        IF(JSON_EXTRACT(productoJSON, '$.cantidad') = '', NULL, JSON_EXTRACT(productoJSON, '$.cantidad')),
        true,
        IF(JSON_EXTRACT(productoJSON, '$.imagen') = '', NULL, JSON_EXTRACT(productoJSON, '$.imagen')),
        JSON_EXTRACT(productoJSON, '$.stock'),
        JSON_EXTRACT(productoJSON, '$.precioContado'),
        JSON_EXTRACT(productoJSON, '$.precioLista'),
        JSON_EXTRACT(productoJSON, '$.precioSuelto')
        );
END // 
DELIMITER ;


call BuscarProductos("nueva prueba");