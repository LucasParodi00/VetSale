const TipoUsuario = require('../models/tipoUsuario');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const manejadorErrores = require('../utils/manejadorErrores');
const { usuarioValidations, validateUsuario } = require('../validators/usuarios');
const { usarioUpdateValidations, validateUpdateUsuario} = require('../validators/usuariosUpdate');
const { usuarioDeleteValidations, validateDeleteUsuario} = require('../validators/usuariosDelete');

// Función login
const loginUsuario = async (req, res) => {
    try {
        const { user, password } = req.body;

        const usuario = await Usuario.findOne({
            where: { user },
            include: [{
                model: TipoUsuario,
                as: 'tipoUsuario',
                attributes: ['tipoUsuario']
            }]
        });

        if (!usuario) {
            return manejadorErrores(res, 'Usuario no encontrado', 404);
        }

        // Comparar la contraseña proporcionada por el usuario con la contraseña encriptada almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return manejadorErrores(res, 'Contraseña incorrecta', 401);
        }

        const token = jwt.sign({ id: usuario.codUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { ...usuario.toJSON(), password: undefined } });
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};


// Función para actualizar la contraseña de un usuario, ya que tendremos que volver a encriptarla
const updatePassword = async (req, res) => {
    try {
        const { id, newPassword } = req.body;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return manejadorErrores(res, 'Usuario no encontrado', 404);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await usuario.update({ password: hashedPassword });
        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

// Función para crear un usuario
const createUsuario = async (req, res) => {
    try {
        const { codTipoUsuario, password, ...userData } = req.body;
        const tipoUsuario = await TipoUsuario.findByPk(codTipoUsuario);
        if (!tipoUsuario) {
            return manejadorErrores(res, 'Tipo de usuario no encontrado', 404);
        }

        // Crear el usuario con la contraseña encriptada
        const usuario = await Usuario.create({ ...userData, password, codTipoUsuario });
        res.status(201).json(usuario);
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

const getUsuarios = async (req, res) => {
    try {
        const { estado } = req.query; // Extrae el estado de los parámetros de consulta
        let whereCondition = {};
        if (estado !== undefined) {
            whereCondition.estado = estado === 'true'; // Convierte el estado a booleano
        }
        const usuarios = await Usuario.findAll({
            where: whereCondition, // Añade la condición al where
            include: [{
                model: TipoUsuario,
                as: 'tipoUsuario',
                attributes: ['tipoUsuario'] // selecciona solo el nombre del tipo de usuario
            }]
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios' });
        }
        res.json(usuarios);
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

// Función para obtener un usuario por su ID
const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            include: [{
                model: TipoUsuario,
                as: 'tipoUsuario',
                attributes: ['tipoUsuario'] // selecciona solo el nombre del tipo de usuario
            }]
        });
        if (!usuario) {
            return manejadorErrores(res, 'Usuario no encontrado', 404);
        }
        res.json(usuario);
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

// Función para actualizar un usuario
const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return manejadorErrores(res, 'Usuario no encontrado', 404);
        }
        const updates = req.body;

        //Excluimos el campo codUsuario de las actualizaciones.
        delete updates.codUsuario;
        
        if (updates.password) {
            const isSamePassword = await bcrypt.compare(updates.password, usuario.password);
            if (!isSamePassword) {
                const salt = await bcrypt.genSalt(10);
                updates.password = await bcrypt.hash(updates.password, salt);
            } else {
                delete updates.password;
            }
        }
        await usuario.update(updates);
        res.json(usuario);
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

// Función para dar de baja un usuario
const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return manejadorErrores(res, 'Usuario no encontrado', 404);
        }
        await usuario.update({ estado: false });
        res.json({ message: 'Usuario dado de baja' });
    } catch (error) {
        manejadorErrores(res, error.message, 400);
    }
};

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    updatePassword
};
