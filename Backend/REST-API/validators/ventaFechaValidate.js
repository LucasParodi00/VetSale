const {check} = require('express-validator');
const moment = require('moment');

const ventasPorFechaValidations = [
    check('fecha1')
        .notEmpty().withMessage('La fecha 1 es obligatoria.')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('La fecha 1 debe estar en el formato DD/MM/YYYY.'),
    check('fecha2')
        .notEmpty().withMessage('La fecha 2 es obligatoria.')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('La fecha 2 debe estar en el formato DD/MM/YYYY.')
        .custom((value, { req }) => {
            const fecha1 = moment(req.query.fecha1, 'DD/MM/YYYY');
            const fecha2 = moment(value, 'DD/MM/YYYY');
            if (fecha2.isBefore(fecha1)) {
                throw new Error('La fecha 2 no puede ser anterior a la fecha 1.');
            }
            if (fecha2.isAfter(moment())) {
                throw new Error('La fecha 2 no puede ser mayor al día actual.');
            }
            return true;
        }),
];

module.exports = ventasPorFechaValidations;