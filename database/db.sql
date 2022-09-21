

CREATE TABLE catalogo (
  id SERIAL PRIMARY KEY,
  nombre varchar ,
  upc varchar unique,
  costo decimal,
  descripcion varchar,
  createdAt timestamp  NOT NULL DEFAULT NOW()
);

CREATE TABLE inventario (
  id SERIAL PRIMARY KEY,
  total int,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  idCatalogo int INTEGER REFERENCES catalogo (id) ON DELETE CASCADE,
);

CREATE TABLE codigos (
  id SERIAL PRIMARY KEY,
  rfid varchar  unique,
  estado int,
  createdAt timestamp  NOT NULL DEFAULT NOW(),
  idCatalogo int INTEGER REFERENCES catalogo (id) ON DELETE CASCADE,
);

CREATE TABLE estados (
  id SERIAL PRIMARY KEY,
  estado varchar
);

CREATE TABLE usuarios(
  id serial PRIMARY KEY,
  usuario varchar  unique,
  nombre varchar ,
  rol int,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  password varchar
);

CREATE TABLE roles(
  id serial PRIMARY KEY,
  rol varchar unique
)
ALTER TABLE usuarios ADD FOREIGN KEY (rol) REFERENCES roles (id);

ALTER TABLE codigos ADD FOREIGN KEY (estado) REFERENCES estados (id);


CREATE TABLE rolesEnlaces(
id SERIAL PRIMARY KEY,
rol int  REFERENCES roles (id) ON DELETE CASCADE,
enlace int  REFERENCES enlaces (id) ON DELETE CASCADE
);

CREATE TABLE enlaces(
id SERIAL PRIMARY KEY,
enlace varchar UNIQUE,
nombre varchar
);

INSERT INTO public.enlaces(	enlace,nombre)	VALUES ('/users','Users');
INSERT INTO public.enlaces(	enlace,nombre)	VALUES ('/items','Items');
INSERT INTO public.enlaces(	enlace,nombre)	VALUES ('/inventory','Inventory');
INSERT INTO public.enlaces(	enlace,nombre)	VALUES ('/cashier','Cashier');
INSERT INTO public.enlaces(	enlace,nombre)	VALUES ('/guard','Guards');


INSERT INTO public.rolesenlaces(rol, enlace)VALUES ( 1, 1), ( 1, 2), ( 1, 3), ( 1, 4), ( 1, 5);
INSERT INTO public.rolesenlaces(rol, enlace)VALUES ( 2, 2), ( 2, 3);
INSERT INTO public.rolesenlaces(rol, enlace)VALUES ( 3, 4);
INSERT INTO public.rolesenlaces(rol, enlace)VALUES ( 4, 5);