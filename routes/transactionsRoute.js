const express = require("express");
const Transaction = require("../models/Transaction");
const { get } = require("mongoose");
const router = express.Router();
const moment = require("moment");

router.post("/add-transaction", async function (req, res) {
  try {
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload)
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({_id:req.body.transactionId})
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange,type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),

      userId: req.body.userId,
      ...(type!=='all' && {type})
    });
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
