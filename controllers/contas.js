const serviceConta = require('../services/contas');

module.exports = {
    getBalance: async (req, res) => {
        try {
            const { codCliente } = req.params;
            const [balance] = await serviceConta.getBalance(codCliente);

            console.log(balance);
            if (!balance) {
                return res.status(404).json({ message: 'Client not found.' });
            }
            return res.status(200).json(balance);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    withdrawal: async (req, res) => {
        try {
            const { codCliente, valor } = req.body;

            const [balance] = await serviceConta.getBalance(codCliente);
            if (!balance) {
                return res.status(404).json({ message: 'Client not found.' });
            }
            const saldo = parseFloat(balance.saldo);
            const newSaldo = saldo - valor;

            if (newSaldo >= 0) {
                const newBalance = await serviceConta.updateBalance(codCliente, newSaldo);
                return res.status(200).json(newBalance);
            } else {
                return res.status(400).json({ message: 'Not enough funds.' });
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deposit: async (req, res) => {
        try {
            const { codCliente, valor } = req.body;

            const [balance] = await serviceConta.getBalance(codCliente);
            const saldo = parseFloat(balance.saldo);
            const newSaldo = saldo + valor;

            const newBalance = await serviceConta.updateBalance(codCliente, newSaldo);
            return res.status(200).json(newBalance);


        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}