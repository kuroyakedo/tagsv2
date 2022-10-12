const { nextTick } = require("process");
const pool = require("../db");

const epcTds = require("epc-tds");

const getAllItems = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM catalogo");
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM catalogo WHERE id=$1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const getItemUpc = async (upc) => {
  try {
    const result = await pool.query("SELECT * FROM catalogo WHERE upc=$1", [
      upc,
    ]);
    if (result.rows.length !== 0) return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const createItem = async (req, res, next) => {
  const { nombre, upc, costo, descripcion } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO catalogo(nombre,upc,costo,descripcion)VALUES ($1,$2,$3,$4) RETURNING *",
      [nombre, upc, costo, descripcion]
    );
    const r = await createItemInventory(result.rows[0].id);
    res.json(result.rows[0]);
  } catch (err) {
    //res.json({ error: err.message });
    next(err);
    console.log(err);
  }
};

const createItemInventory = async (id) => {
  try {
    const result = await pool.query(
      "INSERT INTO inventario(total,idcatalogo)	VALUES (0,$1)",
      [id]
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM catalogo WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Item not found" });
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const modifyItem = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, upc, costo, descripcion } = req.body;
  try {
    const result = await pool.query(
      "UPDATE catalogo SET nombre=$1,upc=$2,costo=$3,descripcion=$4 WHERE id=$5 RETURNING *",
      [nombre, upc, costo, descripcion, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const itemsRfid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT nombre,upc,costo,descripcion,rutaimagen FROM catalogo WHERE upc=$1",
      [id]
    );
    if (result.rows.length === 0)
      return res.json({ message: "Item not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllItems,
  getItem,
  getItemUpc,
  createItem,
  deleteItem,
  modifyItem,
  itemsRfid,
};
