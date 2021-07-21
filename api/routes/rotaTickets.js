const express = require('express');
const router = express.Router();


//Controlador
const TicketsController = require('../controllers/TicketsController');

//Retornando dados de todos os Tickets
router.get('/', TicketsController.getTickets);

//Retornando dados de um ticket específico
router.get('/:IdTickets', TicketsController.getSpecTickets);

//Inserindo dados do Ticket
router.post('/', TicketsController.postTickets);

//Alterar um Ticket
router.patch('/', TicketsController.patchTickets);

//Remover um Ticket
router.delete('/:IdTickets', TicketsController.deleteSpecTickets);

//Remover Todos os Tickets
router.delete('/', TicketsController.deleteTickets);

module.exports = router;