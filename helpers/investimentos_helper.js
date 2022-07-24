const serviceAtivos = require('../services/ativos');
const serviceContas = require('../services/contas');

const check_updateAssetAmount = async (codAtivo, qtdeAtivo) => {

    const [asset] = await serviceAtivos.getAtivos(codAtivo);

    const newAssetAmount = asset.qtdeAtivo - qtdeAtivo;

    if (newAssetAmount < 0) {
        return 400;
    }
    await serviceAtivos.updateAtivos(newAssetAmount, codAtivo);
}

const updateClientAsset = async ({ codCliente, codAtivo, qtdeAtivo }) => {
    const [assetsByClient] = await serviceAtivos.getAtivosByClient(codCliente);

    const [selectedAssetByClient] = assetsByClient.filter((el) => el.codAtivo === codAtivo);

    const clientAssetAfterPurchase = selectedAssetByClient.qtdeAtivo + qtdeAtivo;

    await serviceAtivos.updateAtivosByClient(codCliente, codAtivo, clientAssetAfterPurchase);
};

// const updateClientBalance = async (codCliente, newBalance) => {
//     const [balance] = await serviceContas.updateBalance(codCliente, newBalance);

//     return balance;
// }

/*
const check_updateClientAssetAmount = async ({ codCliente, codAtivo, qtdeAtivo }) => {
    const [AllAssetsByClient] = await serviceAtivos.getAtivosByClient(codCliente);

    const [assetByClient] = AllAssetsByClient.filter((el) => el.codAtivo === codAtivo);

    const assetAfterSell = assetByClient.qtdeAtivo - qtdeAtivo;

    if(assetAfterSell < 0 ) {
        return 400;
    }

    await serviceAtivos.updateAtivosByClient(codCliente, codAtivo, assetAfterSell);
}*/

module.exports = {
 check_updateAssetAmount,
 updateClientAsset,
//  updateClientBalance,
}