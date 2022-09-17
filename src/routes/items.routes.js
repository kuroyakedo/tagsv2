const { Router } = require("express");
const pool = require("../db");
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  modifyItem,
  itemsRfid,
} = require("../controllers/item.controller");

const multer = require("multer")
const path = require('path')
const fs = require('fs')

const router = Router();

router.get("/items", getAllItems);

router.get("/items/:id", getItem);

router.post("/items", createItem);

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-item-' + file.originalname)
  }
})
const fileUpload = multer({
  storage: diskstorage
}).single('image')

router.put("/itemImage/:id", fileUpload, async (req, res, next) => {  
  const { id } = req.params;
  const filepath=path.join(__dirname, '../images/')+req.file.filename; 
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    const result = await pool.query(
      "UPDATE catalogo SET rutaimagen=$1 WHERE id=$2 RETURNING *",
      [filepath, id]
    );
    res.json(result.rows[0]);
  }  
});

router.delete("/items/:id", deleteItem);

router.put("/items/:id", modifyItem);

router.get("/itemsRfid/:id", itemsRfid);

module.exports = router;
