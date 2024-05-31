//middleware para verificar el token JWT

const jwt = require('jsonwebtoken');
const manejadorErrores = require('../utils/manejadorErrores');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return manejadorErrores(res, 'Acceso denegado, token faltante', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        manejadorErrores(res, 'Token inválido', 401);
    }
};

module.exports = authMiddleware;