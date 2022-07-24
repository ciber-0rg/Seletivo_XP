const express = require('express');
const { login } = require('../controllers/login');
const validate = require('../middlewares/validation');

const router = express.Router();

// ok!
router
    .route('/')
    .post(validate.login, login);

module.exports = router;