// routes/ventas.js 

const express = require('express');
const router = express.Router();
const {
    createVenta,
    getVenta,
    getVentas,
} = require('../controllers/ventas');

const { ventaValidations, validateVenta } = require('../validators/ventas');
const ventasPorFechaValidations = require('../validators/ventaFechaValidate');

router.post('/', ventaValidations,  validateVenta, createVenta);
router.get('/', getVentas);
router.get('/:codVenta', getVenta); //Obtiene por ID


module.exports = router;
