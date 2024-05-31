const { check, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const Venta = require('../models/venta');
const Compra = require('../models/compra');

const usuarioDeleteValidations = [
    check('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio.')
        .custom(async (value) => {
            const existingUser = await Usuario.findByPk(value);
            if (!existingUser) {
                throw new Error('No existe un usuario con ese ID.');
            }
            if (!existingUser.estado) {
                throw new Error('El usuario ya está inactivo.');
            }
            const ventas = await Venta.findOne({ where: { codUsuario: value } });
            if (ventas) {
                throw new Error('El usuario tiene ventas asociadas.');
            }
            const compras = await Compra.findOne({ where: { codUsuario: value } });
            if (compras) {
                throw new Error('El usuario tiene compras asociadas.');
            }
            return true;
        })
];

const validateDeleteUsuario = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = {
    usuarioDeleteValidations,
    validateDeleteUsuario
};
