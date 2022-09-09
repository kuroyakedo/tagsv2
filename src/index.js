const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const rolesRoutes = require("./routes/roles.routes");
const itemsRoutes = require("./routes/items.routes");
const inventoryRoutes = require("./routes/inventory.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(usersRoutes);
app.use(rolesRoutes);
app.use(itemsRoutes);
app.use(inventoryRoutes);

app.use((err, req, res, next) => {
  return res.json({ message: "Error!" });
});

app.listen(3001);
console.log("SERVER RUNNING ON 3001");
