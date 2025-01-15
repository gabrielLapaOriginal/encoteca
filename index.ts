require('dotenv').config();
import bookRoute from './routes/book.route.js'
import authorRoute from './routes/author.route.js'
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import swaggerDocs from './utils/swagger.js';

const app:Application = express();

const PORT = Number(process.env.PORT) || 3000;

//middleware
app.use(express.json());

//routes
app.use("/api", bookRoute);
app.use("/api", authorRoute);

app.get(`/`, (req:Request, res:Response) =>{
  res.send("Hello from node api");
});

mongoose.connect(process.env.MONGO_URI!)
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


