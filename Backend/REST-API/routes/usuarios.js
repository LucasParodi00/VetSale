





const express = require('express');
const cors = require('cors');

const { getUsuarios, setUsuario, login } = require('../controllers/usuarios');

const router = express.Router();


router.get('/', getUsuarios);

router.post('/', setUsuario);

router.post('/login', login);


module.exports = router;