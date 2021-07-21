create database atividadeinfojr;

use atividadeinfojr;

create table Filmes(
IdFilmes int not null auto_increment,
Titulo varchar(50),
Genero varchar(30),
ModoDeVisualizacao enum("2D", "3D"),
DataDeLançamento date,
primary key(IdFilmes)
)default charset = utf8;

create table Tickets(
IdTickets int not null auto_increment,
Valor decimal(4, 2),
Descriçao varchar(40),
primary key (IdTickets)
)default charset = utf8;

create table Secoes(
IdSecoes int not null auto_increment,
Horarios time,
IdSala int,
primary key(IdSecoes)
)default charset = utf8;

create table Sala(
IdSala int not null auto_increment,
Sala tinyint(2),
AssentosDisponiveis int,
primary key(IdSala)
)default charset = utf8;

create table Vendas(
IdVendas int not null auto_increment,
IdFilmes int,
IdSecoes int,
primary key(IdVendas)
)default charset = utf8;

create table VendasTickets(
IdVendasTickets int not null auto_increment,
IdTickets int,
IdVendas int,
Quantidade int,
primary key(IdVendasTickets)
)default charset = utf8;

alter table secoes
add foreign key (IdSala)
references sala(IdSala);

alter table vendas
add foreign key (IdFilmes)
references filmes(IdFilmes);

alter table vendas
add foreign key (IdSecoes)
references secoes(IdSecoes);

alter table vendastickets
add foreign key (IdTickets)
references tickets(IdTickets);

alter table vendastickets
add foreign key (IdVendas)
references vendas(IdVendas);