const express = require('express');

const router = express.Router();

// ok!
router
    .route('/')
    .post();

module.exports = router;