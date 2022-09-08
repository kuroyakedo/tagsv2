const { nextTick } = require("process");
const pool = require("../db");
const epcTds = require("epc-tds");

const getAllUsers = async (req, res, next) => {
  /* try {
    const result = await pool.query(
      "SELECT id,nombre,departamento,usuario FROM usuarios"
    );
    res.json(result.rows);
  } catch (err) {
    //res.json({ error: err.message });
    next(err);
  }*/
  let epc = epcTds.valueOf("30342CB3E4103349EC246836"); // sgtin-96
  // Acces to epc properties
  console.log("Type--: " + epc.getType()); // TDS ID
  console.log("Filter: " + epc.getFilter()); // filter index
  console.log("Partition: " + epc.getPartition()); // partition index
  console.log("CompanyPrefix: " + epc.getCompanyPrefix());
  console.log("ItemReference: " + epc.getItemReference());
  console.log("GTIN(EAN): " + epc.getGtin()); // ean
  console.log("HexEPC: " + epc.toHexString()); // HEX EPC
  console.log("Tag URI: " + epc.toTagURI());

  // Decode from Hex Tag URI
  epc = epcTds.fromTagURI("urn:epc:tag:sgtin-96:3.0614141.812345.6789");
  console.log("HexEPC: " + epc.toHexString()); // HEX EPC
  console.log("Tag URI: " + epc.toTagURI());
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id,nombre,departamento,usuario FROM usuarios WHERE id=$1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { usuario, password, nombre, departamento } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO usuarios(nombre,departamento,usuario,password)VALUES ($1,$2,$3,$4) RETURNING *",
      [nombre, departamento, usuario, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    //res.json({ error: err.message });
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const modifyUser = async (req, res, next) => {
  const { id } = req.params;
  const { usuario, password, nombre, departamento } = req.body;
  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre=$1,departamento=$2,usuario=$3,password=$4 WHERE id=$5 RETURNING *",
      [nombre, departamento, usuario, password, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  modifyUser,
};
