const connection = require("./connection");

module.exports = {
    findClient: async (email, senha) => {
        const client = await connection.execute(
            `SELECT email, senha FROM back_end_XP.clients
            WHERE email = ? AND senha = ?`, [email, senha]
        );
        return client;
    },
}