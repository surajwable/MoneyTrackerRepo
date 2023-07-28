const express = require('express')
const dbConnect = require('./dbConnect')

// Create an instance of the Express app
const app = express()

app.use(express.json())

const userRoute = require('./routes/userRoute')
const transactionsRoute = require('./routes/transactionsRoute')

app.use('/api/users/',userRoute)
app.use('/api/transactions/', transactionsRoute)


// Set the port for the server to listen on
const port = 5000;

app.get('./' ,(req,res) => res.send('hello world'))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
