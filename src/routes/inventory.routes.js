const { Router } = require("express");
const { addInventory } = require("../controllers/inventory.controller");

const router = Router();

router.post("/inventory/:id", addInventory);

module.exports = router;
