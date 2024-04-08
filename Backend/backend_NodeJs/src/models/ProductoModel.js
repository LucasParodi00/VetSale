const db = require('../data/database');
const { DataTypes } = require("sequelize");

const ProductoModel = db.define('producto', {
    codProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    codCategoria: { type: DataTypes.INTEGER },
    codTamanio: { type: DataTypes.INTEGER },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    peso: { type: DataTypes.DOUBLE },
    mililitro: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.BOOLEAN },
    imagen: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER },
    precioContado: { type: DataTypes.STRING },
    precioLista: { type: DataTypes.STRING },
    precioSuelto: { type: DataTypes.STRING }
}, {
    tableName: 'producto',
    timestamps: false
});


module.exports = ProductoModel;