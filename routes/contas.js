const express = require('express');
const authToken = require('../middlewares/authToken');
const { getBalance, withdrawal, deposit } = require('../controllers/contas');
const validate = require('../middlewares/validation');

const router = express.Router();

router
    .route('/:codCliente')
    .get(authToken, getBalance);

// ok!
router
    .route('/saque')
    .post(authToken, validate.withdrawal, withdrawal);

// ok!
router
    .route('/deposito')
    .post(authToken, validate.withdrawal, deposit);

module.exports = router;