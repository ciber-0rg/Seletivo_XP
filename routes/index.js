const express = require('express');

const router = express.Router();

const login = require('./login');
const contas = require('./contas');
const investimentos = require('./investimentos');
const ativos = require('./ativos');

router.use('/login', login);
router.use('/contas', contas);
router.use('/investimentos', investimentos);
router.use('/ativos', ativos);

module.exports = router;