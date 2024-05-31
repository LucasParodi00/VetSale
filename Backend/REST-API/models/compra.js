//TODO MODELO COMPRA
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const CompraDetalle = require('./compraDetalle'); // Importamos el modelo de compraDetalle

const Compra = sequelize.define('compra', {
    codCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    montoTotal: {
        type: DataTypes.STRING(100)
    }
},{
        tableName: 'compra', // especificamos el nombre de la tabla ya que me detecta en plural
        timestamps: false
    });

// Definimos la relación con el modelo CompraDetalle
Compra.hasMany(CompraDetalle, { foreignKey: 'codCompra' });

module.exports = Compra;