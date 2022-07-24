const connection = require('./connection');

module.exports = {
    getBalance: async (codCliente) => {
        const [balance] = await connection.execute(
            `SELECT codCliente, SUM(saldo) AS saldo
            FROM back_end_XP.contas WHERE codCliente = ?
            GROUP BY codCLiente`, [codCliente]
        );
        return balance;
    },

    updateBalance: async (codCliente, valor) => {
        await connection.execute(
            `UPDATE back_end_XP.contas
            SET saldo = ?
            WHERE codCliente = ?;`, [valor, codCliente]
        )

        const newBalance = getBalance(codCliente);
        return newBalance;
    },
}