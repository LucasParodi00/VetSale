const db = require('../data/database');
const router = require("express").Router(); 
const ProductoModel = require("../models/ProductoModel");
const Sequelize = require('sequelize');
const Joi = require('joi');

//QUE DEBERÍA HACER ACA:  LISTAR - INSERTAR - ELIMINAR - MODIFICAR -

//LISTAR PRODUCTOS TOTALES
router.get('/', async (req, res) => {
    const ListProduct = await ProductoModel.findAll();
    res.json(ListProduct);
})

//TODO: insertar nuevo producto 
const productoNuevoValidate = Joi.object({
    codCategoria: Joi.number().integer().required(),
    codTamanio: Joi.number().integer().optional(),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    peso: Joi.number().optional(),
    mililitro: Joi.number().optional(),
    cantidad: Joi.number().integer().optional(),
    imagen: Joi.string().optional(),
    stock: Joi.number().integer().required(), 
    precioContado: Joi.number().required(), 
    precioLista: Joi.number().required(), 
    precioSuelto: Joi.number().required() 
}); 
router.post('/', async (req, res) => {
    const { error, value } = productoNuevoValidate.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const producto = value;
    try {
        await db.query("CALL InsertarProducto(?)", {
            replacements: [JSON.stringify(producto)],
            type: Sequelize.QueryTypes.RAW  
        });
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//TODO: filtro por codProducto 
//  SE PUEDE FILTRAR POR ´´CODIGO DE PRODUCTO - NOMBRE: (PRODUCTO/CATEGORIA/MASCOTA/EDAD) ´´ 
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    try {
        const resultados = await db.query("CALL BuscarProductos(:param)",
            {
                replacements: { param: param },
                type: db.QueryTypes.RAW
            });
        const datos = resultados;
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//ESQUEMA DE VALIDACION PARA MODIFICAR PRODUCTO
const productoModificarValidate = Joi.object({
    codProducto: Joi.number().integer().required(),
    codCategoria: Joi.number().integer().required(),
    codTamanio: Joi.number().integer().optional(),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    peso: Joi.number().optional(),
    mililitro: Joi.number().optional(),
    cantidad: Joi.number().integer().optional(),
    imagen: Joi.string().optional(),
    stock: Joi.number().integer().required(),
    precioContado: Joi.number().required(),
    precioLista: Joi.number().required(),
    precioSuelto: Joi.number().required(),
    codEdades: Joi.array().items(Joi.number().integer()).optional(),
    codMascotas: Joi.array().items(Joi.number().integer()).optional()
});

//TODO: modificar un producto 
router.put('/', async (req, res) => {
    const { error, value } = productoModificarValidate.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const producto = value;
    try {
        await db.query("CALL ModificarProducto(?)", {
            replacements: [JSON.stringify(producto)],
            type: Sequelize.QueryTypes.RAW 
        });
        res.status(200).json({ message: 'Producto modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ESQUEMA DE VALIDACION PARA ALTERAR ESTADO DEL PRODUCTO
const productoAlterarEstado = Joi.object({
    codProducto: Joi.number().integer().required()
});

//TODO: alterar estado producto (eliminar/dar de alta)
router.delete('/', async (req, res) => {
    const { error, value } = productoAlterarEstado.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const producto = value;
    try {
        //verifica si el producto existe
        const result = await db.query("CALL BuscarProductos(?)", {
            replacements: [producto.codProducto],
            type: Sequelize.QueryTypes.RAW
        });
        if (result[0].length == 0) {
            //si el producto no existe, devuelve un error
            res.status(404).json({ error: 'El producto no existe' });
            return;
        }
        //si el producto existe, modifica su estado
        await db.query("CALL ModificarEstadoProducto(?)", {
            replacements: [producto.codProducto],
            type: Sequelize.QueryTypes.RAW
        });
        res.status(200).json({ message: 'Estado del producto modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'El producto no existe' });
    }
});

//>> FIN
module.exports = router;