const serviceAtivos = require('../services/ativos');
const { check_updateAssetAmount, updateClientAsset, /*check_updateClientAssetAmount*/  } = require('../helpers/investimentos_helper');

const buyAssets = async (req, res) => {
    try {
        const { codCliente, codAtivo, qtdeAtivo } = req.body;
        const status = check_updateAssetAmount(codAtivo, qtdeAtivo);
        if (status === 400) {
            return res.status(status).json({ message: 'Not enough assets available for this purchase. Try a different amount.' });
        }
        updateClientAsset(req.body);

        return res.status(200).json({ message: 'Your purchase has been successful.' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const sellAssets = async (req, res) => {
    try {
        const { codCliente, codAtivo, qtdeAtivo } = req.body;
        const [AllAssetsByClient] = await serviceAtivos.getAtivosByClient(codCliente);
        const [assetByClient] = AllAssetsByClient.filter((el) => el.codAtivo === codAtivo);
        const assetAfterSell = assetByClient.qtdeAtivo - qtdeAtivo;
        if(assetAfterSell < 0){
            return res.status(400).json({ message: 'Not enough assets to complete the sell.' });
        }
        await serviceAtivos.updateAtivosByClient(codCliente, codAtivo, assetAfterSell);

        return res.status(200).json({ message: 'Assets sold!' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    buyAssets,
    sellAssets,
};