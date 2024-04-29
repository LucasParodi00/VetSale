// models/VentaDetalle.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Producto = require('./producto');
const Venta = require('./venta');

const VentaDetalle = sequelize.define('ventaDetalle', {
    codVentaDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    codVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Venta,
            key: 'codVenta'
        }
    },
    codProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'codProducto'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioUnitario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    subTotal: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = VentaDetalle;
