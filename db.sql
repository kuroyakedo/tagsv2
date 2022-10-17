

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
  idCatalogo int REFERENCES catalogo (id) ON DELETE CASCADE
);

CREATE TABLE codigos (
  id SERIAL PRIMARY KEY,
  rfid varchar  unique,
  estado int,
  createdAt timestamp  NOT NULL DEFAULT NOW(),
  idCatalogo int REFERENCES catalogo (id) ON DELETE CASCADE
);

CREATE TABLE estados (
  id SERIAL PRIMARY KEY,
  estado varchar
);

CREATE TABLE usuarios(
  id serial PRIMARY KEY,
  usuario varchar  unique,
  nombre varchar,
  rol int,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  password varchar
);

CREATE TABLE roles(
  id serial PRIMARY KEY,
  rol varchar unique
)

ALTER TABLE codigos ADD FOREIGN KEY (estado) REFERENCES estados (id);



