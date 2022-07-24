const serviceAtivos = require('../services/ativos');
const serviceContas = require('../services/contas');
const { check_updateAssetAmount, updateClientAsset, updateClientBalance } = require('../helpers/investimentos_helper');

const buyAssets = async (req, res) => {
    try {
        const { codCliente, codAtivo, qtdeAtivo } = req.body;
        // confere saldo do cliente
        const [balance] = await serviceContas.getBalance(codCliente);
        const totalPurchasePrice = codAtivo * qtdeAtivo;
        // se nao tiver saldo suficiente, retorna a mensagem
        if (balance.saldo < totalPurchasePrice) {
            return res.status(400).json({ message: "Client does not have the required amount to finish this purchase." });
        }
        // checa se o ativo possui aquela quantidade para ser vendida, se sim, ja atualiza a quantidade disponivel pos compra
        const status = await check_updateAssetAmount(codAtivo, qtdeAtivo);

        if (status === 400) {
            return res.status(status).json({ message: 'Not enough assets available for this purchase. Try a different amount.' });
        }
        // se tiver, ja atualiza a carteira do cliente que efetuou a compra
        updateClientAsset(req.body);

        const newBalance = await serviceContas.updateBalance(codCliente, totalPurchasePrice);

        return res.status(200).json({ message: `Your purchase has been successful. And you current balance is R$${newBalance.saldo}` });

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