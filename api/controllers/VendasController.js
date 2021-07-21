const mysql = require('../../database').pool;


//Retornando dados de todas as Vendas
exports.getVendas = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT filmes.Titulo, filmes.ModoDeVisualizacao, secoes.Horarios, sala.Sala FROM vendas JOIN filmes ON vendas.IdVendas = filmes.IdFilmes JOIN secoes ON vendas.IdVendas = secoes.IdSecoes JOIN sala ON secoes.IdSecoes = sala.IdSala',
            (error,resultado, fields) =>{
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Vendas',
                    response: resultado
                });
            }
        )
    });
};

//Retornando dados de uma venda específica
exports.getSpecVendas = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM vendas JOIN filmes ON vendas.IdVendas = filmes.IdFilmes JOIN secoes ON vendas.IdVendas = secoes.IdSecoes JOIN sala ON secoes.IdSecoes = sala.IdSala WHERE IdVendas = ?',
            [req.params.IdVendas],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Venda',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados da Venda
exports.postVendas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO vendas (IdFilmes, IdSecoes) VALUES (?,?)',
            [req.body.IdFilmes, req.body.IdSecoes],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Dados da Venda Inseridos!',
                    id_ticket: resultado.insertId
                });
            }
        )
    });

};

//Alterar dados de uma venda
exports.patchVendas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE vendas SET IdFilmes = ?, IdSecoes = ? WHERE IdVendas = ?',
            [req.body.IdFilmes, req.body.IdSecoes, req.body.IdVendas],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Dados da Venda alterado com Sucesso!',
                });
            }
        )
    });

};

//Remover uma Venda
exports.deleteSpecVendas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM vendas  WHERE IdVendas = ?',
            [req.params.IdVendas],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Dados da venda Removidos com Sucesso',
                });
            }
        )
    });

};

//Remover Todas as Vendas
exports.deleteVendas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM vendas',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Lista de vendas Limpa',
                });
            }
        )
    });

};