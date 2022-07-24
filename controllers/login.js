const serviceLogin = require('../services/login');
const { generateToken } = require('../helpers/JWTToken');
/**
 * login é controller que busca por todos os clientes no banco de dados
 * confere se os dados de login conferem com os presentes no banco de dados
 * conferindo, retorna status 200 e o token gerado
 * o token tem duraçao de 1h de autorização
 * o token gerado no momento de login é conferido em todos os endpoints
 */
module.exports = {
    login : async (req, res) => {
        try {
        const client = await serviceLogin.login(req.body);

        console.log(client[0]);

        if (client[0].length === 0) {
            return res.status(404).json({ message: 'No client registered under such datas.' });
        }

        const token = generateToken(req.body);

        return res.status(200).json({ token });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}