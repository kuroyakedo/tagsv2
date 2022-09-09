const { Router } = require("express");
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  modifyItem,
} = require("../controllers/item.controller");

const router = Router();

router.get("/items", getAllItems);

router.get("/items/:id", getItem);

router.post("/items", createItem);

router.delete("/items/:id", deleteItem);

router.put("/items/:id", modifyItem);

module.exports = router;
