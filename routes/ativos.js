const express = require('express');
const { getAtivosByClient, getAtivos } = require('../controllers/ativos');
const authToken = require('../middlewares/authToken');

const router = express.Router();

/**
 * authToken é o middleware de verificação do token
 * getAtivos é o controller que solicita ao service o ativo que possui tal ID, no caso, codAtivo.
 */
router
    .route('/:codAtivo') //ativos
    .get(authToken, getAtivos);

/**
 * getAtivosByCliente é o controller que solicita ao service todos os ativos que tal cliente possui a partir da ID do cliente, neste caso, codCliente.
 */
router
    .route('/cliente/:codCliente') //cliente
    .get(authToken, getAtivosByClient);


module.exports = router;