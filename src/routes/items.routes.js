const { Router } = require("express");
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  modifyItem,
  itemsRfid
} = require("../controllers/item.controller");

const router = Router();

router.get("/items", getAllItems);

router.get("/items/:id", getItem);

router.post("/items", createItem);

router.delete("/items/:id", deleteItem);

router.put("/items/:id", modifyItem);
router.put("/itemsRfid/:id", itemsRfid);

module.exports = router;
