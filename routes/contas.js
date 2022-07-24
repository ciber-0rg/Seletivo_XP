const express = require('express');
const authToken = require('../middlewares/authToken');
const { getBalance, withdrawal, deposit } = require('../controllers/contas');
const router = express.Router();

router
    .route('/:codCliente')
    .get(authToken, getBalance);

// ok!
router
    .route('/saque')
    .post(authToken, withdrawal);

// ok!
router
    .route('/deposito')
    .post(authToken, deposit);

module.exports = router;