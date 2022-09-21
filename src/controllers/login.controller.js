const pool = require("../db");
const bcrypt = require("bcrypt");

const LogIn = async (req, res, next) => {
  console.log(req.session);
  try {
    const { usuario, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario=$1  ",
      [usuario]
    );
    if (result.rows.length === 0)
      return res.json({ id: 0, loggedIn: false, status: "User not found" });
    const confirmPAssword = bcrypt.compareSync(
      password,
      result.rows[0].password
    );

    if (confirmPAssword) {
      req.session.user = {
        id: result.rows[0].id,
        username: result.rows[0].username,
        name: result.rows[0].name,
        role: result.rows[0].role,
        loggedIn: true,
        status: "Logged in!",
      };
      res.json(result.rows[0]);
    } else {
      return res.json({
        id: 0,
        loggedIn: false,
        status: "Password doesn't match",
      });
    }
  } catch (err) {
    //next(err);
    console.log(err);
  }
};

module.exports = { LogIn };
