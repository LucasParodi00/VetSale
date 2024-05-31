const { check, validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const usuarioUpdateValidations = [
    check('nombreApellido')
        .optional()
        .notEmpty().withMessage('El nombre y apellido es obligatorio.')
    .matches(/^[a-zA-Z]+( [a-zA-Z]+)+$/).withMessage('El nombre y apellido debe contener al menos dos palabras.')
    .not().matches(/ $/).withMessage('No se permiten espacios al final del nombre y apellido.')
    .not().matches(/  /).withMessage('No se permiten espacios dobles en el nombre y apellido.'),
    check('celular')
        .optional()
        .matches(/^\d{10,15}$/).withMessage('El número de celular no es válido. Debe tener entre 10 y 15 dígitos.'),
    check('password')
        .optional()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe incluir al menos un símbolo.')
        .not().matches(/\s/).withMessage('La contraseña no debe contener espacios.'),
    check('codTipoUsuario')
        .optional()
        .isIn([1, 2]).withMessage('El código de tipo de usuario debe ser 1 o 2.')
        .notEmpty().withMessage('El código de tipo de usuario no puede estar vacío.'),
    check('user')
        .optional()
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .isAlphanumeric().withMessage('El nombre de usuario debe ser alfanumérico (solo letras y números).')
        .not().matches(/\s/).withMessage('El nombre de usuario no debe contener espacios.')
        .custom(async (value) => {
            const existingUser = await Usuario.findOne({ where: { user: value } });
            if (existingUser) {
                throw new Error('Ya existe un usuario con ese nombre de usuario.');
            }
            return true;
        })
];

const validateUpdateUsuario = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = {
    usuarioUpdateValidations,
    validateUpdateUsuario
};
