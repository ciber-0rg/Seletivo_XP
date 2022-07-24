const express = require('express');
const { getAtivosByClient, getAtivos } = require('../controllers/ativos');
const authToken = require('../middlewares/authToken');

const router = express.Router();

//ok!
router
    .route('/:codAtivo') //ativos
    .get(authToken, getAtivos);

// ok!
router
    .route('/cliente/:codCliente') //cliente
    .get(authToken, getAtivosByClient);


module.exports = router;