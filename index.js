require('dotenv').config();
const bookRoute = require('./routes/book.route.js')
const express = require('express');
const mongoose = require('mongoose');
const swaggerDocs = require('./utils/swagger.js');

const app = express();

const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())

//routes
app.use("/api/books", bookRoute)

app.get(`/`, (req, res) =>{
  res.send("Hello from node api")
});

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
  console.log("Connected to database!");
  app.listen(PORT, ()=> {
  console.log("Server is running on port 3000")
  swaggerDocs(app, PORT)
  });
})
.catch(() =>{
  console.log("Connection failed");
})


