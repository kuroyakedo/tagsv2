

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
  idCatalogo int
);

CREATE TABLE codigos (
  id SERIAL PRIMARY KEY,
  rfid varchar  unique,
  estado int,
  createdAt timestamp  NOT NULL DEFAULT NOW(),
  idCatalogo int
);

CREATE TABLE estados (
  id SERIAL PRIMARY KEY,
  estado varchar
);

CREATE TABLE usuarios(
  id serial PRIMARY KEY,
  usuario varchar  unique,
  nombre varchar ,
  departamento int,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  password varchar
);


ALTER TABLE inventario ADD FOREIGN KEY (idCatalogo) REFERENCES catalogo (id);

ALTER TABLE codigos ADD FOREIGN KEY (estado) REFERENCES estados (id);

