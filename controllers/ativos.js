const serviceAtivos = require('../services/ativos');

module.exports = {

    getAtivosByClient: async (req, res) => {
        try {
            const { codCliente } = req.params;

            const [ativos] = await serviceAtivos.getAtivosByClient(codCliente);

            if (ativos.length != 0) {
                return res.status(200).json(ativos);
            }

            return res.status(404).json({ message: 'No assets found for this client.' });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getAtivos: async (req, res) => {
        try {
            const { codAtivo } = req.params;

            const [ativos] = await serviceAtivos.getAtivos(codAtivo);

            if (ativos) {
                return res.status(200).json(ativos);
            }

            return res.status(404).json({ message: "No asset registered under this identifier." });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

}