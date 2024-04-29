// models/CompraDetalle.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Producto = require('./producto');
const Compra = require('./compra');

const CompraDetalle = sequelize.define('compraDetalle', {
    codCompraDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codCompra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Compra,
            key: 'codCompra'
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
    precioCompra: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precioContado: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precioLista: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precioSuelto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subTotal: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = CompraDetalle;
