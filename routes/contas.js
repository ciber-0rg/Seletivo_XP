const express = require('express');
const authToken = require('../middlewares/authToken');
const { getBalance, withdrawal, deposit } = require('../controllers/contas');
const validate = require('../middlewares/validation');

const router = express.Router();

/**
 * authToken é o middleware de verificação do token
 * getBalance é controller que solicita ao service o saldo do cliente de acordo com a ID presente no parametro, neste caso, codCliente
 */
router
    .route('/:codCliente')
    .get(authToken, getBalance);

/**
 * validate.withdrawal valida os dados inseridos no body
 * withdrawal é controller que solicita ao service o saque do valor
 */
router
    .route('/saque')
    .post(authToken, validate.withdrawal, withdrawal);

/**
 * validate.withdrawal é usada novamente para validar os dados do body
 * (o ideal seria renomear este middleware q é usado em duas rotas com propositos diferentes)
 * deposit é controller que solicita ao service o deposito do valor
 */
router
    .route('/deposito')
    .post(authToken, validate.withdrawal, deposit);

module.exports = router;