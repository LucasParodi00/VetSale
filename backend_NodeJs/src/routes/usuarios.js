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