const express = require('express');
const authToken = require('../middlewares/authToken');
const { sellAssets, buyAssets } = require('../controllers/investimentos');
const router = express.Router();

/**
 * authToken é o middleware de verificação do token
 * sellAssets é o controller que solicita ao service a  venda de ativos de certo cliente
*/
router
    .route('/vender')
    .post(authToken, sellAssets);

/**
 * buyAssets é o controller que solicita ao service a compra de ativos por certo cliente
 */
router
    .route('/comprar')
    .post(authToken, buyAssets);

module.exports = router;