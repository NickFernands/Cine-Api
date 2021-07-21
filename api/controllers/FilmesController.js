const mysql = require('../../database').pool;

//Retornando dados de todos os Filmes
exports.getFilmes = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM filmes',
            (error,resultado, fields) =>{
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Informações dos Filmes',
                    response: resultado
                });
            }
        )
    });
};

//Retornando dados de uma filme específico
exports.getSpecFilmes = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM filmes WHERE IdFilmes = ?',
            [req.params.IdFilmes],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Informações do Filme',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados dos Filmes
exports.postFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO filmes (Titulo, Genero, ModoDeVisualizacao, DataDeLançamento) VALUES (?,?,?,?)',
            [req.body.Titulo, req.body.Genero, req.body.ModoDeVisualizacao, req.body.DataDeLançamento],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Filme Inserido no Catalógo',
                    id_filmes: resultado.insertId
                });
            }
        )
    });

};

//Alterar informações de um Filme
exports.patchFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE filmes SET Titulo = ?, Genero = ?, ModoDeVisualizacao = ?, DataDeLançamento = ? WHERE IdFilmes = ?',
            [req.body.Titulo, req.body.Genero, req.body.ModoDeVisualizacao, req.body.DataDeLançamento, req.body.IdFilmes],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Informações do Filme Atualizada',
                });
            }
        )
    });

};

//Remover um Filme
exports.deleteSpecFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM filmes  WHERE IdFilmes = ?',
            [req.params.IdFilmes],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Filme Removido com Sucesso!',
                });
            }
        )
    });

};

//Remover Todos os Filmes
exports.deleteFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM filmes',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Catálogo de Filmes Apagado!',
                });
            }
        )
    });

};