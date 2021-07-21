const mysql = require('../../database').pool;

//Retornando dados de todas as Seções
exports.getSecoes = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT secoes.Horarios, sala.Sala, sala.AssentosDisponiveis FROM secoes JOIN sala ON secoes.IdSecoes = sala.IdSala',
            (error,resultado, fields) =>{
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Seções',
                    response: resultado
                });
            }
        )
    });
};

//Retornando dados de uma seção específica
exports.getSpecSecoes = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM secoes JOIN sala ON secoes.IdSecoes = sala.IdSala WHERE IdSecoes = ?',
            [req.params.IdSecoes],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Seção',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados da Seção
exports.postSecoes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO secoes (Horarios, IdSala) VALUES (?,?)',
            [req.body.Horarios, req.body.IdSala],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Horário da Seção Definido',
                    id_ticket: resultado.insertId
                });
            }
        )
    });

};

//Alterar uma Seção
exports.patchSecoes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE secoes SET Horarios = ?, IdSala = ? WHERE IdSecoes = ?',
            [req.body.Horarios, req.body.IdSala, req.body.IdSecoes],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Ticket Alterado com Sucesso',
                });
            }
        )
    });

};

//Remover uma Seção
exports.deleteSpecSecoes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM secoes  WHERE IdSecoes = ?',
            [req.params.IdSecoes],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Seção Removida com Sucesso',
                });
            }
        )
    });

};

//Remover Todas as Seções
exports.deleteSecoes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM secoes',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Lista de Seções Limpa',
                });
            }
        )
    });

};