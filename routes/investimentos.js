const express = require('express');

const router = express.Router();

// ok!
router
    .route('/vender')
    .post();

// ok!
router
    .route('/comprar')
    .post();

module.exports = router;