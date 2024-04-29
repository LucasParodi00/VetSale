// models/TipoUsuario.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoUsuario = sequelize.define('tipoUsuario', {
    codTipoUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoUsuario: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
},
    {
        tableName: 'tipoUsuario',
        timestamps: false
    },
);

module.exports = TipoUsuario;
