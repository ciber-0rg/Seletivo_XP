const modelConta = require('../models/contas');

module.exports = {
    getBalance: (codCliente) => modelConta.getBalance(codCliente),

    updateBalance: async (codCliente, valor) => {
        const [newBalance] = await modelConta.updateBalance(codCliente, valor);
        return newBalance;
    },
}