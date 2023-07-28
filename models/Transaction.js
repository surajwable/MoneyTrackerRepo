const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   userId : {type: String, required: true},   
   amount : {type: Number, required: true},
   type : {type:String, required:true},
   category : {type:String, required:true},
   description : {type:String, required:true},
   date : {type:String, required:true},
   
});

const transactionModel = mongoose.model('Transactions',transactionSchema);

module.exports = transactionModel;