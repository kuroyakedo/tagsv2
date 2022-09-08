const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  modifyUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", modifyUser);

module.exports = router;
