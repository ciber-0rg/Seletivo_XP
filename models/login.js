const connection = require("./connection");

/**
 * findClient passa para o DB a query que encontra o usuário que possui os dados oferecidos pelo cliente no login e retorna o cliente encontrado (caso encontre) - não encontrando, retorna array vazio
 */
module.exports = {
    findClient: async (email, senha) => {
        const client = await connection.execute(
            `SELECT email, senha FROM back_end_XP.clients
            WHERE email = ? AND senha = ?`, [email, senha]
        );
        return client;
    },
}