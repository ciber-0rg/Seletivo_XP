const express = require('express');

const router = express.Router();

router
    .route('/:codCliente')
    .get();

// ok!
router
    .route('/saque')
    .post();

// ok!
router
    .route('/conta/deposito')
    .post();

module.exports = router;