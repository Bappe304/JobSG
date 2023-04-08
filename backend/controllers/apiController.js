const request = require("request");


const getJobLocation = async function (postalCode) {
    const response = await fetch('https://developers.onemap.sg/commonapi/search?searchVal=' + postalCode +'&returnGeom=Y&getAddrDetails=Y&pageNum=1')
    const data = await response.json()
    if(data["found"] == 0 || data["results"][0]["POSTAL"] != postalCode){
        throw Error("Invalid Address Entered")
    }
    const {ADDRESS, LATITUDE, LONGITUDE} = data["results"][0]
    
    return {"address": ADDRESS, "latitude": LATITUDE, "longitude":LONGITUDE}

}



module.exports = {getJobLocation}