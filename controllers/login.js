const serviceLogin = require('../services/login');
const { generateToken } = require('../helpers/JWTToken');

module.exports = {
    login : async (req, res) => {
        try {
        const client = await serviceLogin.login(req.body);

        if (!client) {
            return res.status(404).json({ message: 'No client registered under such datas.' });
        }

        const token = generateToken(req.body);

        return res.status(200).json({ token });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}