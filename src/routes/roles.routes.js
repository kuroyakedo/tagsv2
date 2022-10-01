const { Router } = require("express");
const { getAllRoles, getRole } = require("../controllers/role.controller");

const router = Router();

router.get("/role", getAllRoles);

router.get("/role/:id", getRole);

module.exports = router;
