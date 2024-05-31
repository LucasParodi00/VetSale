//Modelo de la entidad usuario
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); 
const TipoUsuario = require('./tipoUsuario');
const bcrypt = require('bcrypt'); //se añade bcrypt

const Usuario = sequelize.define('usuario', { 
    codUsuario: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true, // Agregue esta linea ya que en postman daba vacio el codUsuario
    },
    nombreApellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING              
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codTipoUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        unique: true
    }
}
,{
    tableName:'usuario',
    timestamps:  false,
    hooks: {
        beforeCreate: async (usuario) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(usuario.password, salt);
                usuario.password = hashedPassword;
            } catch (error) {
                throw new Error('Error al encriptar la contraseña: ' + error.message);
            }
        }    
    }
});

Usuario.belongsTo(TipoUsuario, { foreignKey: 'codTipoUsuario', as: 'tipoUsuario'});

module.exports = Usuario;
