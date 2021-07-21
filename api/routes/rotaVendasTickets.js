const express = require('express');
const router = express.Router();

//Controlador
const VendasTicketsController = require('../controllers/VendasTicketsController');

//Retornando dados de todas as Vendas
router.get('/', VendasTicketsController.getVendasTickets);

//Retornando dados de uma venda específica
router.get('/:IdVendasTickets', VendasTicketsController.getSpecVendasTickets);

//Inserindo dados da Venda
router.post('/', VendasTicketsController.postVendasTickets);

//Alterar dados de uma venda
router.patch('/', VendasTicketsController.patchVendasTickets);

//Remover uma Venda
router.delete('/:IdVendasTickets', VendasTicketsController.deleteSpecVendasTickets);

//Remover Todas as Vendas
router.delete('/', VendasTicketsController.deleteVendasTickets);

module.exports = router;