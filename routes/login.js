const express = require('express');
const { login } = require('../controllers/login');
const validate = require('../middlewares/validation');

const router = express.Router();

/**
 * rota para login do cliente
 * body é validaddo por validate.login usando JOI
 * controller login confirma existencia de usuario no sistema e gera token
 * */
router
    .route('/')
    .post(validate.login, login);

module.exports = router;