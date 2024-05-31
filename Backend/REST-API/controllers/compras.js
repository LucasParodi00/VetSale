const Compra = require('../models/compra');
const CompraDetalle = require('../models/compraDetalle');
const Producto = require('../models/producto'); // Agregamos esta linea para poder utilizar al modelo producto
const manejadorErrores = require('../utils/manejadorErrores');
const { compraValidations, validateCompra } = require('../validators/compras');
const { sequelize } = require('../config/database'); // Importamos la instancia de Sequelize


// const crearCompra = async (req, res) => {
//     const transaction = await sequelize.transaction(); // Inicia una transacción
//     try {
//         const { codUsuario, detalleCompra } = req.body;

//         // Validar que el detalle de la compra no esté vacío
//         if (!detalleCompra || detalleCompra.length === 0) {
//             return res.status(400).json({ error: 'El detalle de la compra es requerido' });
//         }

//         // Calcular el monto total y actualizar los precios de venta y sueltos
//         let montoTotal = 0;
//         detalleCompra.forEach((detalle) => {
//             const subtotal = detalle.cantidad * parseFloat(detalle.precioCompra);
//             montoTotal += subtotal;
//             detalle.subTotal = subtotal.toFixed(2); // Actualizar el subtotal en el detalle de compra

//             detalle.precioVenta = (parseFloat(detalle.precioCompra) * 1.3).toFixed(2); // Porcentaje de ganancia
//             detalle.precioSuelto = (parseFloat(detalle.precioCompra) / 10 * 1.1).toFixed(2); // Precio suelto
//         });

//         // Crear la compra en la base de datos dentro de la transacción
//         const compra = await Compra.create({ codUsuario, montoTotal }, { transaction });

//         // Crear los detalles de la compra
//         await Promise.all(detalleCompra.map(async (detalle) => {
//             // Buscar el producto por su código
//             const producto = await Producto.findByPk(detalle.codProducto);

//             // Verificar si el producto existe
//             if (!producto) {
//                 throw new Error(`Producto con código ${detalle.codProducto} no encontrado`);
//             }

//             // Crear el detalle de la compra
//             await CompraDetalle.create({
//                 codCompra: compra.codCompra,
//                 codProducto: detalle.codProducto,
//                 cantidad: detalle.cantidad,
//                 precioCompra: detalle.precioCompra,
//                 precioVenta: detalle.precioVenta,
//                 precioSuelto: detalle.precioSuelto,
//                 subTotal: detalle.subTotal
//             }, { transaction });

//             // Incrementar el stock del producto
//             producto.stock += parseInt(detalle.cantidad);

//             // Guardar el producto actualizado dentro de la transacción
//             await producto.save({ transaction });
//         }));

//         await transaction.commit(); // Confirma la transacción

//         res.status(201).json({ message: 'Compra creada exitosamente' });
//     } catch (error) {
//         await transaction.rollback(); // Revertir la transacción en caso de error
//         console.error(error);
//         manejadorErrores(res, 'Hubo un error al crear la compra', 500);
//     }
// };

const crearCompra = async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia una transacción
    try {
        const { codUsuario, detalleCompra } = req.body;

        // Validar que el detalle de la compra no esté vacío y contenga los campos necesarios
        if (!detalleCompra || detalleCompra.length === 0) {
            return res.status(400).json({ error: 'El detalle de la compra es requerido' });
        }

        // Calcular el monto total y actualizar los precios de venta y sueltos
        let montoTotal = 0;
        for (const detalle of detalleCompra) {
            const subtotal = detalle.cantidad * parseFloat(detalle.precioCompra);
            montoTotal += subtotal;
            detalle.subTotal = subtotal.toFixed(2); // Actualizar el subtotal en el detalle de compra

            detalle.precioVenta = (parseFloat(detalle.precioCompra) * 1.3).toFixed(2); // Porcentaje de ganancia
            detalle.precioSuelto = (parseFloat(detalle.precioCompra) / 10 * 1.1).toFixed(2); // Precio suelto
        }

        // Crear la compra en la base de datos dentro de la transacción
        const compra = await Compra.create({ codUsuario, montoTotal }, { transaction });

        // Crear los detalles de la compra
        for (const detalle of detalleCompra) {
            const producto = await Producto.findByPk(detalle.codProducto);

            if (!producto) {
                throw new Error(`Producto con código ${detalle.codProducto} no encontrado`);
            }

            await CompraDetalle.create({
                codCompra: compra.codCompra,
                codProducto: detalle.codProducto,
                cantidad: detalle.cantidad,
                precioCompra: detalle.precioCompra,
                precioVenta: detalle.precioVenta,
                precioSuelto: detalle.precioSuelto,
                subTotal: detalle.subTotal
            }, { transaction });

            // Incrementar el stock del producto
            producto.stock += parseInt(detalle.cantidad);
            await producto.save({ transaction });
        }

        await transaction.commit(); // Confirma la transacción

        res.status(201).json({ message: 'Compra creada exitosamente' });
    } catch (error) {
        await transaction.rollback(); // Revertir la transacción en caso de error
        console.error(error);
        manejadorErrores(res, 'Hubo un error al crear la compra', 500);
    }
};



const obtenerCompraPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findByPk(id, { include: CompraDetalle }); // Carga ansiosa de la asociación
        if (!compra) {
            return res.status(404).json({ mensaje: 'Compra no encontrada' });
        }
        res.json(compra);
    } catch (error) {
        console.error(error);
        manejadorErrores(res, 'Hubo un error al obtener la compra', 500);
    }
};

const listarCompras = async (req, res) => {
    try {
        const compras = await Compra.findAll({
            include: [{ model: CompraDetalle }]
        });

        if (compras.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron compras.' });
        }

        res.json(compras);
    } catch (error) {
        console.error(error);
        manejadorErrores(res, 'Hubo un error al listar las compras', 500);
    }
};


module.exports = {
    crearCompra,
    obtenerCompraPorId,
    listarCompras
};
