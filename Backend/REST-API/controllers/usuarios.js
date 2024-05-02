
const bcryptjs = require('bcrypt');
const { usuario } = require('../models');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.findAllData();
        res.json(usuarios)
    } catch (error) {
        res.json({
            message: 'Error al listar los usuarios.',
            error
        })
    }
}

const setUsuario = async (req, res) => {
    const { body } = req;
    const { password } = body

    try {
        const passwordHash = await bcryptjs.hash(password, 8);

        body.password = passwordHash;

        const usuarioCreado = await usuario.create(body);
        res.json({
            message: 'Usuario creado correctamente',
            usuarioCreado
        })
    } catch (error) {
        res.json({
            message: 'Error al crear el usuario',
            error
        })
    }
}

const login = async (req, res) => {
    const { user, password } = req.body;
    console.log(req.body);
    try {
        const usuarioBusqueda = await usuario.findOne({ where: { user } })

        if (usuarioBusqueda) {
            const passwordMatch = await bcryptjs.compare(password, usuarioBusqueda.password);
            if (passwordMatch) {
                res.status(200)
                res.json({
                    message: 'Usuario encontrado',
                    usuarioBusqueda
                })
            } else {
                res.json({
                    message: 'Datos incorrecto'
                })
            }
        } else {
            res.json({ message: 'Datos incorrecto' })
        }
    } catch (error) {
        res.json({
            message: 'Ocurrio un error al intentar ingresar al sistema',
            error
        })
    }

}





module.exports = { getUsuarios, setUsuario, login } 