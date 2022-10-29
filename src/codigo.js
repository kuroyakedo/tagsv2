const epcTds = require("epc-tds");

function getUpc(rfid){
    let epc = (rfid.substr(26, 2) +
    rfid.substr(24, 2) +
    rfid.substr(22, 2) +
    rfid.substr(20, 2) +
    rfid.substr(18, 2) +
    rfid.substr(16, 2) +
    rfid.substr(14, 2) +
    rfid.substr(12, 2) +
    rfid.substr(10, 2) +
    rfid.substr(8, 2) +
    rfid.substr(6, 2) +
    rfid.substr(4, 2));
 let upc = epcTds.valueOf(epc);
 return upc.getGtin().substr(2)
}
function getEpc(rfid){
    return (rfid.substr(26, 2) +
    rfid.substr(24, 2) +
    rfid.substr(22, 2) +
    rfid.substr(20, 2) +
    rfid.substr(18, 2) +
    rfid.substr(16, 2) +
    rfid.substr(14, 2) +
    rfid.substr(12, 2) +
    rfid.substr(10, 2) +
    rfid.substr(8, 2) +
    rfid.substr(6, 2) +
    rfid.substr(4, 2)) 
}


module.exports={
    getUpc, getEpc
}