// file: auth.js
//se enfoca en la autenticación, inicio de sesión y manejo de tokens

const router = require("express").Router();
const db = require('../data/database');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UsuarioModel = require("../models/UsuarioModel");

//esquema de validacion usuario nuevo 
const usuarioNuevoValidate = Joi.object({
    nombreApellido: Joi.string().required(),
    celular: Joi.string().required(),
    password: Joi.string().required(),
    codTipoUsuario: Joi.number().integer().required(),
    user: Joi.string().required()
});

//TODO: insertar nuevo usuario 
async function registrarUsuario(req, res) {
    const { error, value } = usuarioNuevoValidate.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    // Hashear la contraseña antes de eniviar a la db
    const usuario = value;
    try {
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        usuario.password = hashedPassword;
        await db.query("CALL InsertarUsuario(?)", {
            replacements: [JSON.stringify(usuario)],
            type: Sequelize.QueryTypes.RAW
        });

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//TODO: login y token JWT
async function iniciarSesion(req, res) {
    const { user, password } = req.body;

    try {
        //buscar el usuario en la base de datos por el nombre de usuario
        const usuario = await UsuarioModel.findOne({ where: { user } });

        //verificar si el usuario existe y la contraseña es válida para ese user
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }

        //si credenciales son válidas, generar un token JWT y devolverlo
        const token = generarToken(usuario.id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//generar un token JWT
function generarToken(userId) {
    const token = jwt.sign({ userId }, 'secreto', { expiresIn: '1h' });
    return token;
}

router.post('/', registrarUsuario);
router.post('/login', iniciarSesion);

module.exports = router;