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
const loginRoutes = require("./routes/login.routes");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

app.use(
  cors({
    origin: express.static("./client/public"),
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use(loginRoutes);
app.use(usersRoutes);
app.use(rolesRoutes);
app.use(itemsRoutes);
app.use(inventoryRoutes);
app.use(cashierRoutes);
app.use(guardRoutes);

app.use(express.static(path.join(__dirname, "./images")));

app.use((err, req, res, next) => {
  return res.json({ message: "Error!" });
});

app.listen(process.env.PORT);
console.log("SERVER RUNNING ON 3001");
