//TODO VALIDACIONES DE COMPRA

const { check, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const compraValidations = [
    check('codUsuario')
        .notEmpty().withMessage('El código de usuario es obligatorio.')
        .isInt().withMessage('El código de usuario debe ser un número entero.')
        .custom(async (value) => {
            const existingUser = await Usuario.findByPk(value);
            if (!existingUser) {
                throw new Error('No existe un usuario con ese código.');
            }
        }),

    check('detalleCompra')
        .isArray().withMessage('El detalle de la compra debe ser un array.')
        .notEmpty().withMessage('El detalle de la compra no puede estar vacío.'),

    check('detalleCompra.*.codProducto')
        .notEmpty().withMessage('El código del producto es obligatorio.')
        .isInt().withMessage('El código del producto debe ser un número entero.')
        .custom(async (value) => {
            const existingProduct = await Producto.findByPk(value);
            if (!existingProduct) {
                throw new Error(`Producto con código ${value} no encontrado.`);
            }
        }),

    check('detalleCompra.*.cantidad')
        .notEmpty().withMessage('La cantidad del producto es obligatoria.')
        .isInt({ gt: 0 }).withMessage('La cantidad del producto debe ser un número entero positivo.'),

    check('detalleCompra.*.precioCompra')
        .notEmpty().withMessage('El precio de compra es obligatorio.')
        .isFloat({ gt: 0 }).withMessage('El precio de compra debe ser un número real positivo.'),

    check('detalleCompra.*.precioVenta')
        .notEmpty().withMessage('El precio de venta es obligatorio.')
        .isFloat({ gt: 0 }).withMessage('El precio de venta debe ser un número real positivo.'),

    check('detalleCompra.*.precioSuelto')
        .notEmpty().withMessage('El precio suelto es obligatorio.')
        .isFloat({ gt: 0 }).withMessage('El precio suelto debe ser un número real positivo.'),
];

const validateCompra = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = {
    compraValidations,
    validateCompra
};
