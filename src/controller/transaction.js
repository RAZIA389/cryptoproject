const axios = require('axios')
const transactionSchema=require('../models/transactionModel')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null )return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
};



const getTransaction = async (req, res) => {

    let address = req.body.address
    let options = {
        method: "get",
        url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=PPEUPHRT1XS3PMBQIGVXG2HWMIBMZ7Y5EX`
    };

   // VALIDATION FOR ADDRESS
    
    if(!address){
       return  res.status(400).send({status: false, message: "Please Enter address"})
    }
    
    if(!isValid(address)){
        return res.status(400).send({status:false, message: "Please Enter Valid Address"})
    }

    let ans = await axios(options);
    let details = ans.data.result

    await transactionSchema.create({address: address, transactionData:details})

    res.status(200).send({ address: address, transaction: details})
}

module.exports.getTransaction = getTransaction