const modelLogin = require('../models/login');

module.exports = {
    login : ({ email, senha }) => modelLogin.findClient(email, senha),
};