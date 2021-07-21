const express = require('express');
const router = express.Router();

//Controlador
const VendasController = require('../controllers/VendasController')

//Retornando dados de todas as Vendas
router.get('/', VendasController.getVendas);

//Retornando dados de uma venda específica
router.get('/:IdVendas', VendasController.getSpecVendas);

//Inserindo dados da Venda
router.post('/', VendasController.postVendas);

//Alterar dados de uma venda
router.patch('/', VendasController.patchVendas);

//Remover uma Venda
router.delete('/:IdVendas', VendasController.deleteSpecVendas);

//Remover Todas as Vendas
router.delete('/', VendasController.deleteVendas);

module.exports = router;