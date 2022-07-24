const express = require('express');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router
    .route('/:codCliente')
    .get(authToken);

// ok!
router
    .route('/saque')
    .post(authToken);

// ok!
router
    .route('/deposito')
    .post(authToken);

module.exports = router;