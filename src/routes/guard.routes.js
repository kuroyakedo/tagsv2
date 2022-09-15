const { Router } = require("express");
const guard = require("../controllers/guard.controller");

const router = Router();

router.get("/guard/:id", guard);

module.exports = router;
