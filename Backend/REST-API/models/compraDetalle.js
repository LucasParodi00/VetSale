//TODO MODELO COMPRA DETALLE
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompraDetalle = sequelize.define('compra_detalle', {
    codCompraDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codCompra: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioCompra: {
        type: DataTypes.STRING(100)
    },
    precioVenta: {
        type: DataTypes.STRING(100)
    },
    precioSuelto: {
        type: DataTypes.STRING(100)
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    subTotal: {
        type: DataTypes.STRING(100)
    }},{
        tableName: 'compra_detalle',// especificamos el nombre de la tabla ya que me detecta en plural 
        timestamps: false
    });



module.exports = CompraDetalle;