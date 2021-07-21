const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

/** ROUTES **/
const rotaVendas = require ('./api/routes/rotaVendas');
const rotaFilmes = require ('./api/routes/rotaFilmes');
const rotaSecoes = require ('./api/routes/rotaSecoes');
const rotaTickets = require ('./api/routes/rotaTickets');
const rotaSala = require ('./api/routes/rotaSala');
const rotaVendasTickets = require ('./api/routes/rotaVendasTickets');

//Informações de Log das rotas no terminal
app.use(morgan('dev'));

/** Configurações de Body **/
app.use(bodyParser.urlencoded({extended: false})); //Aceita Apenas Dados Simples
app.use(bodyParser.json()); //Só permite JSON como entrada no body

/** Configurações do CORS **/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATH');
        return res.status(200).send({});
    }

    next();
})

/** Rotas utilizadas no Postman **/
app.use('/vendas', rotaVendas);
app.use('/filmes', rotaFilmes);
app.use('/secoes', rotaSecoes);
app.use('/tickets', rotaTickets);
app.use('/sala', rotaSala);
app.use('/vendas-tickets', rotaVendasTickets);

//Rotas Utilizada Caso não encontre nenhuma acima
app.use((req, res, next) => {
    const erro =  new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;