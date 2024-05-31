const TipoPago = require('../models/tipoPago');
const manejadorErrores = require('../utils/manejadorErrores');
const { tipoPagoValidations, validateTipoPago } = require('../validators/tipoPagos');

// Obtener todos los tipos de pagos
const obtenerTiposPago = async (req, res) => {
    try {
        const tiposPago = await TipoPago.findAll();
        res.json(tiposPago);
    } catch (error) {
        manejadorErrores(res, error.message, 500); // Utilizar el manejador de errores para responder con un código de estado 500
    }
};

// Obtener un tipo de pago por su ID
const obtenerTipoPago = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoPago = await TipoPago.findByPk(id);
        if (!tipoPago) {
            return res.status(404).json({ mensaje: 'Tipo de pago no encontrado' });
        }
        res.json(tipoPago);
    } catch (error) {
        manejadorErrores(res, error.message, 500);
    }
};


// Crear un nuevo tipo de pago
const crearTipoPago = async (req, res) => {
    const { nombreTipoPago, recargo } = req.body;
    try {
        // Verificar si ya existe un tipo de pago con el mismo nombre
        const tipoPagoExistente = await TipoPago.findOne({ where: { nombreTipoPago } });
        if (tipoPagoExistente) {
            return res.status(400).json({ error: 'Ya existe un tipo de pago con el mismo nombre' });
        }

        const nuevoTipoPago = await TipoPago.create({ nombreTipoPago, recargo });
        res.json(nuevoTipoPago);
    } catch (error) {
        manejadorErrores(res, error.message, 500); 
    }
};


// Eliminar un tipo de pago por su ID
const eliminarTipoPago = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoPago = await TipoPago.findByPk(id);
        if (!tipoPago) {
            return res.status(404).json({ mensaje: 'Tipo de pago no encontrado' });
        }
        await tipoPago.destroy();
        res.json({ mensaje: 'Tipo de pago eliminado correctamente' });
    } catch (error) {
        manejadorErrores(res, error.message, 500); 
    }
};

module.exports = {
    obtenerTiposPago,
    obtenerTipoPago,
    crearTipoPago,
    eliminarTipoPago,
};
