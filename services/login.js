const modelLogin = require('../models/login');

/**
 * login é usado apenas para chamar o model.findClient
 * findClient é utilizado para encontrar o usuário que possui as informaçoes utilizadas no login
 */
module.exports = {
    login : ({ email, senha }) => modelLogin.findClient(email, senha),
};