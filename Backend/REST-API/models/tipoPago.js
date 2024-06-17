const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoPago = sequelize.define('tipo_pago', { 
    codTipoPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoPago: {
        type: DataTypes.STRING(100)
    },
    recargo: {
        type: DataTypes.DOUBLE(6,2), 
        allowNull: true
    }
}, {
    tableName: 'tipo_pago', // especificamos el nombre de la tabla ya que me detecta en plural
    timestamps: false //Ver que vamos a hacer con los tablas referidas a las marcas de tiempo
});

module.exports = TipoPago;
