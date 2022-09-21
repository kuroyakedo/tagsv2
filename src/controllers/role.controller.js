const { nextTick } = require("process");
const pool = require("../db");


const getAllRoles = async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT id, rol FROM roles"
      );
      res.json(result.rows);
    } catch (err) {
      //res.json({ error: err.message });
      next(err);      
    }
  };

const getRole = async (req, res, next) => {
    try {
        const { id } = req.params;
      const result = await pool.query(
        "SELECT id, rol FROM roles WHERE id=$1",[id]
      );
      if (result.rows.length === 0)
      return res.status(404).json({ message: "Role not found" });
    res.json(result.rows[0]);
    } catch (err) {
      //res.json({ error: err.message });
      next(err);      
    }
  };


const getLinks = async (req, res, next) => {
  try {
      const { id } = req.params;
    const result = await pool.query(
      "SELECT enlaces.id,enlaces.enlace,enlaces.nombre FROM enlaces INNER JOIN rolesenlaces ON enlaces.id=rolesenlaces.enlace WHERE rolesenlaces.rol=$1",[id]
    );
    if (result.rows.length === 0)
    return res.status(404).json({ message: "Role not found" });
    console.log(result.rows)
     res.json(result.rows);
  } catch (err) {
    //res.json({ error: err.message });
    next(err);      
  }
};

  module.exports={
    getAllRoles,
    getRole,
    getLinks
  }