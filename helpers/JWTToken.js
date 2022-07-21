const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'backendxp';

module.exports = {
    generateToken: (payload) => jwt.sign(payload, secret, tokenConfig),
    verifyToken: (token) => jwt.verify(token, secret, tokenConfig),
}
