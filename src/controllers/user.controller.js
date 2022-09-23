const { nextTick } = require("process");
const pool = require("../db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id,nombre,role,usuario FROM usuarios"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id,nombre,role,usuario FROM usuarios WHERE id=$1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { usuario, password, nombre, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const result = await pool.query(
      "INSERT INTO usuarios(nombre,role,usuario,password)VALUES ($1,$2,$3,$4) RETURNING *",
      [nombre, parseInt(role), usuario, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
    console.log(err);
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
  const { usuario, password, nombre, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre=$1,role=$2,usuario=$3,password=$4 WHERE id=$5 RETURNING *",
      [nombre, parseInt(role), usuario, hashedPassword, id]
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
