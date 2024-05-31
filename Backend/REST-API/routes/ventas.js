// routes/ventas.js 

const express = require('express');
const router = express.Router();
const {
    crearVenta,
    obtenerVentaPorId,
    listarVentasPorFecha,
    listarVentas
} = require('../controllers/ventas');

const { ventaValidations, validateVenta } = require('../validators/ventas');
const ventasPorFechaValidations = require('../validators/ventaFechaValidate');

router.post('/', ventaValidations,  validateVenta, crearVenta);
router.get('/', listarVentas);
router.get('/filtrar', ventasPorFechaValidations, validateVenta, listarVentasPorFecha);
router.get('/:codVenta', obtenerVentaPorId);


module.exports = router;
