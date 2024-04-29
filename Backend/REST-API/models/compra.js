// models/Compra.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./usuario');

const Compra = sequelize.define('compra', {
    codCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.exports = Compra;

