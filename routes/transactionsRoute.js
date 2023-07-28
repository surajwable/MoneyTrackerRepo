const express = require('express')
const Transaction = require('../models/Transaction');
const { get } = require('mongoose');
const router = express.Router()

router.post("/add-transaction",async function(req,res){
    try{
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send("Transaction added successfully");
    }catch(error){
     res.status(500).json(error);
    }
 });

 router.get('/get-all-transactions', async(req, res) => {
    try{
        const transactions = await Transaction.find({})
        res.send(transactions)
    }catch(error){
        res.status(500).json(error);
    }
  });
  

 module.exports = router;