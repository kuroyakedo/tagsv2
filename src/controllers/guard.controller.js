const { nextTick } = require("process");
const pool = require("../db");
const epcTds = require("epc-tds");
const { getItemUpc } = require("./item.controller");

//30342E120C10529AC688C393
const guard = async (req, res, next) => {
  try {
    const { id } = req.params;
    let upc = epcTds.valueOf(id);
    const result = await pool.query("SELECT id FROM codigos WHERE rfid=$1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.json({ message: "Item not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = guard;
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
