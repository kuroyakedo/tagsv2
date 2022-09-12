const { nextTick } = require("process");
const pool = require("../db");
const epcTds = require("epc-tds");

//30342E120C10529AC688C393
const payment = async (req, res, next) => {
  const { rfid } = req.body;
  let upc = epcTds.valueOf(rfid);
  try {
    const result = await pool.query(
      "UPDATE inventario AS i SET total=total-1 FROM catalogo AS c WHERE c.upc=$1 AND i.idcatalogo=c.id",
      [upc.getGtin()]
    );
    const r = await saveRfidCode(rfid);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const saveRfidCode = async (rfid) => {
  try {
    const result = await pool.query(
      "INSERT INTO codigos(rfid)VALUES ($1) RETURNING *",
      [rfid]
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = payment;
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
