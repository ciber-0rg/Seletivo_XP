const express = require('express');
const authToken = require('../middlewares/authToken');
const { sellAssets, buyAssets } = require('../controllers/investimentos');
const router = express.Router();

// ok!
router
    .route('/vender')
    .post(authToken, sellAssets);

// ok!
router
    .route('/comprar')
    .post(authToken, buyAssets);

module.exports = router;