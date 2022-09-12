const { Router } = require("express");
const payment = require("../controllers/cashier.controller");

const router = Router();

router.post("/cashier", payment);

module.exports = router;
