create database evaluacionerikralon;

use evaluacionerikralon;

create table EstadoUsuario(
    id  int auto_increment primary key,
    titulo varchar (50) not null,
    clave varchar (50) not null
);

create table usuario(id int auto_increment primary key,
nombre varchar (100) not null,
fecha date not null,
telefono varchar (20) not null,
correo varchar (100) not null,
creacion date not null, 
EstadoUsuarioId int not null, 
foreign key (EstadoUsuarioId) references EstadoUsuario(id)
);

insert into  EstadoUsuario (id, titulo, clave) values
(1, 'Activo', 'activo'),
(2, 'Baja Permanente', 'baja');

insert into usuario (nombre, fecha, telefono, correo, creacion, EstadoUsuarioId) values
('Usuario Baja', '2025-02-01', '12345678', 'usuariobaja@ejemplo.com', curdate(), 2);


set @ayer = date_sub(curdate(), interval 1 day);

insert into usuario (nombre, fecha, telefono, correo, creacion, EstadoUsuarioId) values
('erik ralon', '2025-04-29', '87654321', 'usuarioayer1@ejemplo.com', @ayer, 1),
('josue hernandez', '2025-04-29', '98765432', 'usuarioayer2@ejemplo.com', @ayer, 1)


set @mes_anterior = date_sub(curdate(), interval 1 month);


insert into usuario (nombre, fecha, telefono, correo, creacion, EstadoUsuarioId) values
('benjamin ralon', '2025-03-01', '55554444', 'usuariomes1@ejemplo.com', @mes_anterior, 1),
('erik gonzalez', '2025-03-01', '33332222', 'usuariomes2@ejemplo.com', @mes_anterior, 1);