





const express = require('express');
const cors = require('cors');

const { getUsuarios, setUsuario } = require('../controllers/usuarios');

const router = express.Router();


router.get('/', getUsuarios);

router.post('/', setUsuario)

module.exports = router;