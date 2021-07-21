const mysql = require('../../database').pool;

//Retornando dados de todas as Vendas
exports.getVendasTickets = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT filmes.Titulo, secoes.Horarios, sala.Sala, tickets.Valor, tickets.Descriçao, vendastickets.quantidade FROM vendastickets JOIN filmes ON vendastickets.IdVendasTickets = filmes.IdFilmes JOIN secoes ON vendastickets.IdVendasTickets = secoes.IdSecoes JOIN sala ON secoes.IdSecoes = sala.IdSala JOIN tickets ON vendastickets.IdVendasTickets = tickets.IdTickets',
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
exports.getSpecVendasTickets = (req, res) => {
    mysql.getConnection((error,conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT filmes.Titulo, secoes.Horarios, sala.Sala, tickets.Valor, tickets.Descriçao, vendastickets.quantidade FROM vendastickets JOIN filmes ON vendastickets.IdVendasTickets = filmes.IdFilmes JOIN secoes ON vendastickets.IdVendasTickets = secoes.IdSecoes JOIN sala ON secoes.IdSecoes = sala.IdSala JOIN tickets ON vendastickets.IdVendasTickets = tickets.IdTickets WHERE vendastickets.IdVendasTickets = ?',
            [req.params.IdVendasTickets],
            (error,resultado, fields) => {
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(200).send({
                    menssagem: 'Exibindo dados das Vendas do Ticket',
                    response: resultado
                });
            }
        )
    });
};

//Inserindo dados da Venda
exports.postVendasTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO vendastickets (IdTickets, IdVendas, Quantidade) VALUES (?, ?, ?)',
            [req.body.IdTickets, req.body.IdVendas, req.body.Quantidade],
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
exports.patchVendasTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'UPDATE vendastickets SET IdTickets = ?, IdVendas = ?, Quantidade = ? WHERE IdVendasTickets = ?',
            [req.body.IdTickets, req.body.IdVendas, req.body.Quantidade, req.body.IdVendasTickets],
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
exports.deleteSpecVendasTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM vendastickets  WHERE IdVendasTickets = ?',
            [req.params.IdVendasTickets],
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
exports.deleteVendasTickets = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM vendastickets',
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