// models/TipoPago.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoPago = sequelize.define('tipoPago', {
    codTipoPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoPago: {
        type: DataTypes.STRING(100)
    }
});

module.exports = TipoPago;
