const { check, validationResult } = require('express-validator');
const TipoPago = require('../models/tipoPago');

const tipoPagoValidations = [
    check('nombreTipoPago')
        .notEmpty().withMessage('El nombre del tipo de pago es obligatorio.')
        .matches(/^[^\s]+(\s[^\s]+)*$/).withMessage('El nombre del tipo de pago no puede contener más de un espacio consecutivo ni espacios al final.'),
    check('recargo')
        .optional()
        .isFloat().withMessage('El recargo debe ser un número real.'),
    check('recargo')
        .optional()
        .custom(async (recargo, { req }) => {
            const tipoPagoExistente = await TipoPago.findOne({ where: { recargo } });
            if (tipoPagoExistente) {
                throw new Error('Ya existe un tipo de pago con el mismo recargo');
            }
        })
];


const validateTipoPago = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }   
    next();
};

module.exports = {
    tipoPagoValidations,
    validateTipoPago
};
