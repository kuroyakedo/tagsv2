const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const rolesRoutes = require("./routes/roles.routes");
const itemsRoutes = require("./routes/items.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const cashierRoutes = require("./routes/cashier.routes");
const guardRoutes = require("./routes/guard.routes");
const path = require("path");
const session = require('express-session')
require('dotenv').config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(session({
  secret:process.env.COOKIE_SECRET,
  credentials:true,
  name:"sid",
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:process.env.ENVIROMENT==="production"?"true":"auto",
    httpOnly:true,
    sameSite:process.env.ENVIROMENT==="production"?"none":"lax",
  }
}));

app.use(usersRoutes);
app.use(rolesRoutes);
app.use(itemsRoutes);
app.use(inventoryRoutes);
app.use(cashierRoutes);
app.use(guardRoutes);

app.use(express.static(path.join(__dirname, "images")));

app.use((err, req, res, next) => {
  return res.json({ message: "Error!" });
});

app.listen(process.env.PORT);
console.log("SERVER RUNNING ON 3001");
