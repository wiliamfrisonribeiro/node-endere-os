create table estados (
codigo serial not null primary key, 
nome varchar(50) not null, 
uf varchar(2) not null);

create table cidades (
codigo serial not null primary key,
nome varchar(50) not null, 
descricao varchar(50) not null,
estado integer not null, 
foreign key (estado) references estados (codigo));

-- inserir alguns registros
insert into estados (nome, uf) values ('Rio Grando do Sul', 'RS') , 
('Santa Catarina', 'SC'), ('Rio de Janeiro', 'RJ');

insert into cidades (nome, descricao, estado ) values
('Guaporé','Bonita cidade para comprar joias e langeri',1),
('Marau', 'Cidade boa para morar', 2 );