const bookRoute = require('./routes/book.route.js')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//middleware
app.use(express.json())

//routes
app.use("/api/books", bookRoute)

app.get(`/`, (req, res) =>{
  res.send("Hello from node api")
});

//Cadastro de livro
// app.post('/api/books', async (req, res) =>{
//   try{
//   const books = await Book.create(req.body);
//   res.status(200).json(books)
//   }catch (err){
//     res.status(500).json({message: err.message})
//   }
// });

// //Retorna todos os livros
// app.get('/api/books', async (req, res) =>{
//   try{
//     const books = await Book.find({});
//     res.status(200).json(books);
//   }catch (err){
//     res.status(500).json({message: err.message})
//   }
// });

//Retornar livro especifico
// app.get('/api/books/:id', async (req, res) =>{
//   try{
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     res.status(200).json(book)
//   }catch (err){
//     res.status(500).json({message: err.message})
//   }
// });

//Atualiza um livro
// app.put('/api/books/:id', async (req, res) =>{
//   try{
//     const {id} = req.params;
//     const book = await Book.findByIdAndUpdate(id, req.body)

//     if(!book){
//       return res.status(404).json({message: "Book not found"})
//     }
//     const updatedBook = await Book.findById(id)
//     res.status(200).json(updatedBook)

//   }catch (err){
//     res.status(500).json({message: err.message})
//   }
// });

//Deleta um livro
// app.delete('/api/books/:id', async (req, res) =>{
//   try{
//     const { id } = req.params;
//     const book = await Book.findByIdAndDelete(id)

//     if(!book){
//       return res.status(404).json({message: "Book not found"});
//     }
//     res.status(200).json({message: "Book deleted"})

//   }catch (err){
//     res.status(500).json({message: err.message})
//   }
// });

mongoose.connect('mongodb+srv://admin:admin@bibliotecadb.y2u65.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BibliotecaDB')
.then(() =>{
  console.log("Connected to database!");
  app.listen(3000, ()=> {
  console.log("Server is running on port 3000")
  });
})
.catch(() =>{
  console.log("Connection failed");
})


