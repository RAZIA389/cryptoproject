
const express = require("express")
const route = express.Router();
const transaction = require("../controller/transaction");
const getEther = require('../controller/getEther')
const getBalance  = require('../controller/getBalance')


route.get("/getdetails", transaction.getTransaction)
route.get("/getprice", getEther.getEther)
route.get('/getBalance',getBalance.getBalance)


module.exports = route
