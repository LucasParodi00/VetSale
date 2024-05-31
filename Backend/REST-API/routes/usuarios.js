const express = require('express');
const router = express.Router();
const {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    updatePassword
} = require('../controllers/usuarios');

// Middleware de autenticación.
const authMiddleware = require('../middleware/authMiddleware');
const { usuarioValidations, validateUsuario } = require('../validators/usuarios');
const { usuarioUpdateValidations, validateUpdateUsuario} = require('../validators/usuariosUpdate');
const { usuarioDeleteValidations, validateDeleteUsuario } = require('../validators/usuariosDelete');

router.post('/login', loginUsuario);
router.post('/', usuarioValidations, validateUsuario, createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id',usuarioUpdateValidations, validateUpdateUsuario, updateUsuario); //se agrego validación para el update.
router.delete('/:id', usuarioDeleteValidations, validateDeleteUsuario, deleteUsuario); //validación para la baja de usuario
router.put('/password/:id' , updatePassword);

module.exports = router;
