//TODO CONTROLADOR DEL MODELO VENTA

const Venta = require('../models/venta');
const VentaDetalle = require('../models/ventaDetalle');
const Producto = require('../models/producto'); // Agregamos esta linea para poder buscar el producto.
const TipoPago = require('../models/tipoPago');
const { Op } = require('sequelize');
const moment = require('moment'); //se agrego para poder manipular laa fecha.
const Categoria = require('../models/categoria');
const {sequelize} = require('../config/database'); // Importa la instancia de Sequelize

//Se agrega la validación de ventas.
const { ventaValidations, validateVenta } = require('../validators/ventas');
const ventasPorFechaValidations = require('../validators/ventaFechaValidate');

const createVenta = async (req, res) => {
    const { opcionPago, codUsuario, detalleVenta } = req.body;
    const transaction = await sequelize.transaction();

    try {
        // Recuperar el tipo de pago
        const tipoPago = await TipoPago.findByPk(opcionPago);

        if (!tipoPago) {
            return res.status(404).json({ error: `Tipo de pago no encontrado con codTipoPago: ${opcionPago}` });
        }

        let montoTotal = 0;

        // Calcular el subtotal para cada producto
        for (const detalle of detalleVenta) {
            const producto = await Producto.findByPk(detalle.codProducto);

            if (!producto) {
                return res.status(404).json({ error: `Producto no encontrado con codProducto: ${detalle.codProducto}` });
            }

            const cantidad = parseFloat(detalle.cantidad);
            const precioUnitario = parseFloat(producto.precioVenta);

            if (isNaN(cantidad) || isNaN(precioUnitario) || cantidad <= 0 || precioUnitario <= 0) {
                console.error('Cantidad o precioUnitario no es un número válido:', detalle);
                return res.status(400).json({ error: 'Cantidad o precioUnitario no es un número válido' });
            }

            const subtotal = cantidad * precioUnitario;
            montoTotal += subtotal;
        }

        console.log(`Monto total antes del recargo: ${montoTotal}`);

        // Aplicar el recargo al monto total si es necesario
        const recargo = parseFloat(tipoPago.recargo);
        if (!isNaN(recargo) && recargo > 0) {
            const recargoMonto = (montoTotal * recargo) / 100;
            montoTotal += recargoMonto;
        }

        console.log(`Monto total después del recargo: ${montoTotal}`);

        // Crear la venta
        const nuevaVenta = await Venta.create({
            codTipoPago: opcionPago,
            codUsuario,
            fecha: new Date(),
            montoTotal: montoTotal
        }, { transaction });

        // Crear los detalles de la venta
        for (const detalle of detalleVenta) {
            const producto = await Producto.findByPk(detalle.codProducto);

            const cantidad = parseFloat(detalle.cantidad);
            const precioUnitario = parseFloat(producto.precioVenta);
            const subtotal = cantidad * precioUnitario;

            await VentaDetalle.create({
                codVenta: nuevaVenta.codVenta,
                codProducto: detalle.codProducto,
                cantidad,
                precioUnitario,
                subTotal: subtotal,
                tipoVenta: detalle.tipoVenta
            }, { transaction });
        }

        await transaction.commit();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        console.error('Error al crear la venta:', error);
        await transaction.rollback();
        manejadorErrores(res, 'Error al crear la venta', 500);
    }
};


// Función para obtener detalles de una venta por id
const getVenta = async (req, res) => {
    try {
        const codVenta = req.params.codVenta; // Usamos req.params.codVenta en lugar de req.query.id
        const venta = await Venta.findByPk(codVenta, {
            include: [{ model: VentaDetalle }]
        });

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json(venta);
    } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
        manejadorErrores(res, 'Error al obtener los detalles de la venta', 500);
    }
};


// // Función para poder filtrar las ventas por fechas
// const listarVentasPorFecha = async (req, res) => {
//     try {
//         const { fecha1, fecha2 } = req.query;

//         console.log("Fecha 1 (input):", fecha1);
//         console.log("Fecha 2 (input):", fecha2);

//         if (!fecha1 || !fecha2) {
//             return res.status(400).json({ error: 'Se requieren ambas fechas para filtrar las ventas' });
//         }

//         // Convertir las fechas de DD/MM/YYYY a YYYY-MM-DD
//         const fechaInicio = moment(fecha1, 'DD/MM/YYYY').format('YYYY-MM-DD');
//         const fechaFin = moment(fecha2, 'DD/MM/YYYY').format('YYYY-MM-DD');

//         console.log("Fecha Inicio Convertida:", fechaInicio);
//         console.log("Fecha Fin Convertida:", fechaFin);

//         if (!moment(fechaInicio, 'YYYY-MM-DD', true).isValid() || !moment(fechaFin, 'YYYY-MM-DD', true).isValid()) {
//             return res.status(400).json({ error: 'Las fechas deben estar en el formato DD/MM/YYYY' });
//         }

//         // Ajustar las fechas para cubrir todo el día en UTC
//         const fechaInicioAdjusted = moment.utc(fechaInicio).startOf('day').toDate();
//         const fechaFinAdjusted = moment.utc(fechaFin).endOf('day').toDate();

//         console.log("Fecha Inicio Ajustada:", fechaInicioAdjusted);
//         console.log("Fecha Fin Ajustada:", fechaFinAdjusted);

//         const ventas = await Venta.findAll({
//             where: { 
//                 fecha: { 
//                     [Op.between]: [fechaInicioAdjusted, fechaFinAdjusted] 
//                 } 
//             }
//         });

//         console.log("Ventas encontradas:", ventas);

//         if (ventas.length === 0) {
//             return res.status(404).json({ error: 'No se encontraron ventas en el rango de fechas proporcionado' });
//         }

//         res.json(ventas);
//     } catch (error) {
//         console.error('Error al listar ventas por fecha:', error);
//         manejadorErrores(res, 'Error al listar ventas por fecha', 500);
//     }
// };

// Función para listar todas las ventas
const getVentas = async (req, res) => {
    try {
        const { fecha1, fecha2 } = req.query;
        let whereClause = {};

        if (fecha1 && fecha2) {
            console.log("Fecha 1 (input):", fecha1);
            console.log("Fecha 2 (input):", fecha2);

            const fechaInicio = moment(fecha1, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const fechaFin = moment(fecha2, 'DD/MM/YYYY').format('YYYY-MM-DD');

            console.log("Fecha Inicio Convertida:", fechaInicio);
            console.log("Fecha Fin Convertida:", fechaFin);

            if (!moment(fechaInicio, 'YYYY-MM-DD', true).isValid() || !moment(fechaFin, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({ error: 'Las fechas deben estar en el formato DD/MM/YYYY' });
            }

            const fechaInicioAdjusted = moment.utc(fechaInicio).startOf('day').toDate();
            const fechaFinAdjusted = moment.utc(fechaFin).endOf('day').toDate();

            console.log("Fecha Inicio Ajustada:", fechaInicioAdjusted);
            console.log("Fecha Fin Ajustada:", fechaFinAdjusted);

            whereClause.fecha = {
                [Op.between]: [fechaInicioAdjusted, fechaFinAdjusted]
            };
        }

        const ventas = await Venta.findAll({ where: whereClause });

        if (ventas.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron ventas.' });
        }

        res.json(ventas);
    } catch (error) {
        console.error('Error al listar todas las ventas:', error);
        manejadorErrores(res, 'Error al listar todas las ventas', 500);
    }
};

module.exports = {
    createVenta,
    getVenta,
    listarVentasPorFecha,
    getVentas
};
