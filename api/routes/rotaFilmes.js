const express = require('express');
const router = express.Router();

//Controlador
const FilmesController = require('../controllers/FilmesController')

//Retornando dados de todos os Filmes
router.get('/', FilmesController.getFilmes);

//Retornando dados de uma filme específico
router.get('/:IdFilmes', FilmesController.getSpecFilmes);

//Inserindo dados dos Filmes
router.post('/', FilmesController.postFilmes);

//Alterar informações de um Filme
router.patch('/', FilmesController.patchFilmes);

//Remover um Filme
router.delete('/:IdFilmes', FilmesController.deleteSpecFilmes);

//Remover Todos os Filmes
router.delete('/', FilmesController.deleteFilmes);

module.exports = router;