// models/Venta.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TipoPago = require('./tipoPago');
const Usuario = require('./usuario');

const Venta = sequelize.define('venta', {
    codVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codTipoPago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoPago,
            key: 'codTipoPago'
        }
    },
    codUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'codUsuario'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    montoTotal: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Venta;
