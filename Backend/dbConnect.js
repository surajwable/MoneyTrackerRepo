const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://surajwable:Jyoti%401304@cluster0.cvzk6lc.mongodb.net/moneytracker',{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;

connection.on('error',err => console.log(err));

connection.on('connected',()=> console.log("mongo DB connection successfull..."))

