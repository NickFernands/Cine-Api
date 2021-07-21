const express = require('express');
const router = express.Router();

//Controlador
const SecoesController = require('../controllers/SecoesController');

//Retornando dados de todas as Seções
router.get('/', SecoesController.getSecoes);

//Retornando dados de uma seção específica
router.get('/:IdSecoes', SecoesController.getSpecSecoes)

//Inserindo dados da Seção
router.post('/', SecoesController.postSecoes);

//Alterar uma Seção
router.patch('/', SecoesController.patchSecoes);

//Remover uma Seção
router.delete('/:IdSecoes', SecoesController.deleteSpecSecoes);

//Remover Todas as Seções
router.delete('/', SecoesController.deleteSecoes);

module.exports = router;