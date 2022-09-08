const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(usersRoutes);

app.use((err, req, res, next) => {
  return res.json({ message: "Error!" });
});

app.listen(3001);
console.log("SERVER RUNNING ON 3001");
