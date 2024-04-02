<<<<<<< HEAD
const router = require("express").Router();
const UsuarioModel = require("../models/UsuarioModel");
const db = require('../data/database');
const Sequelize = require('sequelize');
const Joi = require('joi');


//TODO: listar users
async function listarUsuarios(req, res) {
    try {
        const ListUsers = await UsuarioModel.findAll();
        res.json(ListUsers);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al listar los usuarios' });
    }
}

//TODO: filtrar usuario por id (codUsaurio)
async function filtrarUsuarioPorId(req, res) {
    const { codUsuario } = req.params;
    try {
        const UserID = await UsuarioModel.findByPk(codUsuario);
        if (!UserID) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(UserID);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el usuario' });
    }
}

//esquema de validacion user alterar estado
const usuarioAlterarEstado = Joi.object({
    codUsuario: Joi.number().integer().required()
});

//TODO: alterar estado usuario (eliminación lógica)
async function cambiarEstadoUsuario(req, res) {
    const { error, value } = usuarioAlterarEstado.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const usuario = value;
    try {
        // Verifica si el usuario existe
        const result = await db.query("CALL BuscarUsuario(?)", {
            replacements: [usuario.codUsuario],
            type: Sequelize.QueryTypes.RAW
        });
        if (result[0].length == 0) {
            // Si el usuario no existe, devuelve un error
            res.status(404).json({ error: 'El usuario no existe' });
            return;
        }
        // Si el usuario existe, modifica su estado (eliminación lógica)
        await db.query("CALL ModificarEstadoUsuario(?)", {
            replacements: [usuario.codUsuario],
            type: Sequelize.QueryTypes.RAW
        });
        res.status(200).json({ message: 'Estado del usuario modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al cambiar el estado del usuario' });
    }
}

//esquema validacion modificar usuario
const usuarioModificarValidate = Joi.object({
    codUsuario: Joi.number().integer().required(),
    nombreApellido: Joi.string().required(),
    celular: Joi.string().required(),
    codTipoUsuario: Joi.number().integer().required()
});

//TODO: modificar usuario 
async function modificarUsuario(req, res) {
    const { error, value } = usuarioModificarValidate.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const usuario = value;
    try {
        await db.query("CALL ModificarUsuario(?)", {
            replacements: [JSON.stringify(usuario)],
            type: Sequelize.QueryTypes.RAW
        });
        res.status(200).json({ message: 'Usuario modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//rutas usuarios
router.get('/', listarUsuarios);
router.get('/:codUsuario', filtrarUsuarioPorId);
router.delete('/', cambiarEstadoUsuario);
router.put('/', modificarUsuario);

module.exports = router;
=======
const router = require("express").Router(); 
const UsuarioModel = require("../models/UsuarioModel");

//listar users
router.get('/', async (req, res) => {
    const ListUsers = await UsuarioModel.findAll();
    res.json(ListUsers);
});
 

//filtro id
router.get('/:codUsuario', async (req, res) => {
    const {codUsuario} = req.params; 
    try {
        const UserID = await UsuarioModel.findByPk(codUsuario); 
        res.json(UserID);
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

//TODO: para hash 
//const hashedPassword = await hashPassword(user.password);

module.exports = router; 
>>>>>>> 1333b212c5a05d429f620e50d2520e25ac0a8b88
