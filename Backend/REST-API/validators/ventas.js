
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const TipoPago = require('../models/tipoPago');
const tiposDeVentaValidos = ['ventaUnidad', 'ventaPaquete', 'ventaSuelto'];

const ventaValidations = [
    body('opcionPago')
        .exists().withMessage('La opción de pago es obligatoria.')
        .isInt().withMessage('La opción de pago debe ser un número entero.')
        .custom(async (value) => {
            const existingTipoPago = await TipoPago.findByPk(value);
            if (!existingTipoPago) {
                throw new Error('La opción de pago no es válida.');
            }
            return true;
        }),
    body('codUsuario')
        .exists().withMessage('El código de usuario es obligatorio.')
        .isInt().withMessage('El código de usuario debe ser un número entero.')
        .custom(async (value) => {
            const existingUser = await Usuario.findByPk(value);
            if (!existingUser) {
                throw new Error('No existe un usuario con ese código.');
            }
            return true;
        }),
    body('detalleVenta')
        .isArray().withMessage('El detalle de la venta debe ser un array.')
        .notEmpty().withMessage('El detalle de la venta no puede estar vacío.'),
    body('detalleVenta.*.codProducto')
        .notEmpty().withMessage('El código del producto es obligatorio.')
        .isInt().withMessage('El código del producto debe ser un número entero.')
        .custom(async (value) => {
            const existingProduct = await Producto.findByPk(value);
            if (!existingProduct) {
                throw new Error(`Producto con código ${value} no encontrado.`);
            }
            return true;
        }),
    body('detalleVenta.*.cantidad')
        .notEmpty().withMessage('La cantidad del producto es obligatoria.')
        .isInt({ gt: 0 }).withMessage('La cantidad del producto debe ser un número positivo.')
        .custom(async (value, { req }) => {
            const { detalleVenta } = req.body;
            for (const item of detalleVenta) {
                const producto = await Producto.findByPk(item.codProducto);
                if (item.tipoVenta === 'ventaUnidad' || item.tipoVenta === 'ventaSuelto') {
                    if (item.cantidad > producto.stock) {
                        throw new Error(`No puedes vender más productos de los que tienes en stock. Stock actual de producto ${item.codProducto}: ${producto.stock}`);
                    }
                } else if (item.tipoVenta === 'ventaPaquete') {
                    if (producto.stock < 1) {
                        throw new Error(`No puedes vender más paquetes de los que tienes en stock. Stock actual de producto ${item.codProducto}: ${producto.stock}`);
                    }
                }
            }
            return true;
        }),
    body('detalleVenta.*.tipoVenta')
        .notEmpty().withMessage('El tipo de venta es obligatorio.')
        .isIn(tiposDeVentaValidos).withMessage(`El tipo de venta no es válido. Los tipos de venta válidos son: ${tiposDeVentaValidos.join(', ')}`)
];

const validateVenta = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = {
    ventaValidations,
    validateVenta
};
