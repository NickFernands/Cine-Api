const mysql = require('../../database').pool;

//Retornando dados de todos os Tickets
exports.getTickets = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM tickets',
            (error,resultado, fields) =>{
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Tickets',
                    response: resultado
                });
            }
        )
    });
};

//Retornando dados de um ticket específico
exports.getSpecTickets = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM tickets WHERE IdTickets = ?',
            [req.params.IdTickets],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo Ticket',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados do Ticket
exports.postTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO tickets (Valor, Descriçao) VALUES (?,?)',
            [req.body.Valor, req.body.Descriçao],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Ticket Emitido com Sucesso!',
                    id_ticket: resultado.insertId
                });
            }
        )
    });

};

//Alterar um Ticket
exports.patchTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE tickets SET Valor = ?, Descriçao = ? WHERE IdTickets = ?',
            [req.body.Valor, req.body.Descriçao, req.body.IdTickets],
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

//Remover um Ticket
exports.deleteSpecTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM tickets  WHERE IdTickets = ?',
            [req.params.IdTickets],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Ticket Removido com Sucesso',
                });
            }
        )
    });

};

//Remover Todos os Tickets
exports.deleteTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM tickets',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Lista de Tickets Limpa',
                });
            }
        )
    });

};