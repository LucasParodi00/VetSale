// models/VentaDetalle.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Producto = require('./producto');
const Venta = require('./venta');

const VentaDetalle = sequelize.define('venta_detalle', {
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    subTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    tipoVenta: {
        type: DataTypes.STRING(100),
        allowNull: true
    }},{
        tableName: 'venta_detalle',
        timestamps: false,
});



module.exports = VentaDetalle;
