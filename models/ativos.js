const connection = require('./connection');

module.exports = {
    getAtivosByClient: async (codCliente) => {
        const ativos = await connection.execute(
            `SELECT * FROM back_end_XP.ativos_por_clientes
            WHERE codCliente = ?`, [codCliente]
        );

        return ativos;
    },

    updateAtivosByClient: async (codCliente, codAtivo, qtdeAtivo) => {
        await connection.execute(
            `UPDATE back_end_XP.ativos_por_clientes
            SET qtdeAtivo = ?
            WHERE codCliente = ? AND codAtivo = ?;`, [qtdeAtivo, codCliente, codAtivo]
        );
    },

    getAtivos: async (codAtivo) => {
        const [ativos] = await connection.execute(
            `SELECT * FROM back_end_XP.ativos
            WHERE codAtivo = ?`, [codAtivo]
        );

        return ativos;
    },

    updateAtivos: async (qtdeAtivo, codAtivo) => {
        await connection.execute(
            `UPDATE back_end_XP.ativos
            SET qtdeAtivo = ?
            WHERE codAtivo = ?;`, [qtdeAtivo, codAtivo]
        );
    },
}