const express = require('express');

const router = express.Router();

//ok!
router
    .route('/:codAtivo') //ativos
    .get();

// ok!
router
    .route('/cliente/:codCliente') //cliente
    .get();


module.exports = router;