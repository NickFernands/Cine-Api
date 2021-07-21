const express = require('express');
const router = express.Router();


//Controlador
const SalaController = require('../controllers/SalaController');

//Retornando dados de todas as Salas
router.get('/', SalaController.getSala);

//Retornando dados de uma sala específica
router.get('/:IdSala', SalaController.getSpecSala);

//Inserindo dados da Sala
router.post('/', SalaController.postSala);

//Alterar informações de uma Sala
router.patch('/', SalaController.patchSala);

//Remover uma Sala
router.delete('/:IdSala', SalaController.deleteSpecSala);

//Remover Todas as Salas
router.delete('/', SalaController.deleteSala)

module.exports = router;