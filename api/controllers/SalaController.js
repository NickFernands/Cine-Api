const mysql = require('../../database').pool;

//Retornando dados de todas as Salas
exports.getSala = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM sala',
            (error,resultado, fields) =>{
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Informações das Salas',
                    response: resultado
                });
            }
        )
    });
};

//Retornando dados de uma sala específica
exports.getSpecSala = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM sala WHERE IdSala = ?',
            [req.params.IdSala],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Informações da Sala',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados da Sala
exports.postSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO sala (Sala, AssentosDisponiveis) VALUES (?,?)',
            [req.body.Sala, req.body.AssentosDisponiveis],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Sala Criada com Sucesso!',
                    id_sala: resultado.insertId
                });
            }
        )
    });

};

//Alterar informações de uma Sala
exports.patchSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE sala SET Sala = ?, AssentosDisponiveis = ? WHERE IdSala = ?',
            [req.body.Sala, req.body.AssentosDisponiveis, req.body.IdSala],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Informações da Sala Atualizada',
                });
            }
        )
    });

};

//Remover uma Sala
exports.deleteSpecSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM sala  WHERE IdSala = ?',
            [req.params.IdSala],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Sala Removido com Sucesso!',
                });
            }
        )
    });

};

//Remover Todas as Salas
exports.deleteSala = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM sala',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Lista de Salas Limpa',
                });
            }
        )
    });

};