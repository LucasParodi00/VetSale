const { DataTypes } = require("sequelize");
const db = require('../data/database');

const UsuarioModel = db.define('usuario', {
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombreApellido: { type: DataTypes.STRING },
    celular: { type: DataTypes.STRING },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: { type: DataTypes.STRING },
    codTipoUsuario: { type: DataTypes.INTEGER },
    user: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    tableName: 'usuario', //mucho muy importante
    timestamps: false
});

module.exports = UsuarioModel;