
const {Router}=require('express')
const {getAllRoles, getRole,getLinks} = require('../controllers/role.controller')

const router = Router();

router.get("/role", getAllRoles);

router.get("/role/:id", getRole);

router.get("/links/:id", getLinks);


module.exports = router;