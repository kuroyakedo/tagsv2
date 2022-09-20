const { Router } = require("express");
const { LogIn } = require("../controllers/login.controller");

const router = Router();

router.post("/login", LogIn);
module.exports = router;
