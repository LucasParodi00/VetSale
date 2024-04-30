
const bcryptjs = require('bcrypt');
const { usuario } = require('../models');

const getUsuarios = (req, res) => {
    res.send({ message: 'Lista Usuarios' })
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



    // if (user == 'admin' && password == '123') {
    //     const passwordHash = await bcryptjs.hash(password, 8);



    //     res.json({
    //         message: 'Usuario autenticado',
    //         passwordHash
    //     })
    // } else {
    //     res.json({
    //         message: 'Datos Incorrecto'
    //     })
    // }


    res.send({ message: 'Usuario Creado correctamente' })
}





module.exports = { getUsuarios, setUsuario } 