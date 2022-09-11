const { Router } = require("express");
const addInventory  = require("../controllers/inventory.controller");

const router = Router();

router.post("/inventory", addInventory);

module.exports = router;
