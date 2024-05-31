
const express = require('express');
const router = express.Router();
const {
    crearCompra,
    obtenerCompraPorId,
    listarCompras,
} = require('../controllers/compras');

const { compraValidations, validateCompra } = require('../validators/compras');

// Obtener todas las compras
router.get('/', listarCompras);

// Obtener una compra por su ID
router.get('/:id', obtenerCompraPorId);

// Crear una nueva compra
router.post('/', compraValidations, validateCompra, crearCompra);

module.exports = router;
