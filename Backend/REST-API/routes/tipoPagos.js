const express = require('express');
const router = express.Router();
const {
    obtenerTiposPago,
    obtenerTipoPago,
    crearTipoPago,
    eliminarTipoPago
} = require('../controllers/tipoPagos');


const { tipoPagoValidations, validateTipoPago } = require('../validators/tipoPagos');

// Rutas CRUD para los tipos de pagos
router.post('/',tipoPagoValidations, validateTipoPago, crearTipoPago);
router.get('/', obtenerTiposPago);
router.get('/:id', obtenerTipoPago);
router.delete('/:id', eliminarTipoPago);

module.exports = router;        
