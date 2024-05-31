//TODO Modelo de la entidad VENTA models/Venta.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TipoPago = require('./tipoPago');
const Usuario = require('./usuario');
const VentaDetalle = require('./ventaDetalle'); //Importamos el modelo VentaDetalle para poder relacionarlos

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
    montoTotal: { // deje el campo para almacenar el monto total de la venta, por el tema del recargo
        type: DataTypes.DECIMAL(10, 2), // Decimal con 10 dígitos en total y 2 dígitos para decimales
        allowNull: false
    }
}, {
    timestamps: false // Agregar timestamps automáticamente (createdAt, updatedAt)
});

// Definimos la relación con el modelo ventaDetalle
Venta.hasMany(VentaDetalle, { foreignKey: 'codVenta' });


module.exports = Venta;
