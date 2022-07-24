const modelAtivos = require('../models/ativos');

module.exports = {
    getAtivosByClient: (codCliente) => modelAtivos.getAtivosByClient(codCliente),

    updateAtivosByClient: (codCliente, codAtivo, qtdeAtivo) => modelAtivos.updateAtivosByClient(codCliente, codAtivo, qtdeAtivo),

    getAtivos: (codAtivo) => modelAtivos.getAtivos(codAtivo),

    updateAtivos: (qtdeAtivo, codAtivo) => modelAtivos.updateAtivos(qtdeAtivo, codAtivo),
}