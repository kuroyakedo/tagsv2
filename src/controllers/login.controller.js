const { nextTick } = require("process");
const pool = require("../db");
var CryptoJS = require("crypto-js");
const { kMaxLength } = require("buffer");

const login = async (req,res,next) => {
  try {
    const { usuario,password } = req.body;
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const result = await pool.query(
      "ISELECT * FROM usuarios WHERE usuario=$1 AND password=$2",
      [usuario,hashedPassword]
    );
    if (result.rows.length === 0)
    return res.json({ id:0,loggedIn:false,status: "User not found" });
    req.session.user={
      id:result.rows[0].id,
      username:result.rows[0].username,
      name:result.rows[0].name,
      role:result.rows[0].role,
      loggedIn:true,
      status: "Logged in!"
    }
    res.json(result.rows[0]);
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
