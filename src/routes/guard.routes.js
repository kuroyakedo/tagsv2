const { Router } = require("express");
const guard = require("../controllers/guard.controller");

const router = Router();

router.post("/guard", guard);

module.exports = router;
