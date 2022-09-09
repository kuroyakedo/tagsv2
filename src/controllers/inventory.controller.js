const { nextTick } = require("process");
const pool = require("../db");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

const addInventory = async (req, res, next) => {
  const { id } = req.params;
  let epc = epcTds.valueOf(id);
  const upc = epc.getGtin().toString();
  console.log(epc, upc);
  try {
    const result = await pool.query(
      "UPDATE inventario AS i SET i.total=i.total+1 FROM catalogo c WHERE c.upc=$1 AND i.idcatalogo=c.id",
      [upc]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  addInventory,
};
/*let epc = epcTds.valueOf("30342CB3E4103349EC246836"); // sgtin-96
  // Acces to epc properties
  console.log("Type--: " + epc.getType()); // TDS ID
  console.log("Filter: " + epc.getFilter()); // filter index
  console.log("Partition: " + epc.getPartition()); // partition index
  console.log("CompanyPrefix: " + epc.getCompanyPrefix());
  console.log("ItemReference: " + epc.getItemReference());
  console.log("GTIN(EAN): " + epc.getGtin()); // ean
  console.log("HexEPC: " + epc.toHexString()); // HEX EPC
  console.log("Tag URI: " + epc.toTagURI());

  // Decode from Hex Tag URI
  epc = epcTds.fromTagURI("urn:epc:tag:sgtin-96:3.0614141.812345.6789");
  console.log("HexEPC: " + epc.toHexString()); // HEX EPC
  console.log("Tag URI: " + epc.toTagURI());*/
