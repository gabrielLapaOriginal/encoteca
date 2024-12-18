const Book = require("../models/book.model")

//Retorna todos os livros
const getBooks = async (req, res) =>{
  try{
    const page = req.query.p;
    const booksPerPage = 3;

    const books = page ? await Book.find({}).skip(page * booksPerPage).limit(booksPerPage) : await Book.find({});
    res.status(200).json(books);
  }catch (err){
    res.status(500).json({message: err.message})
  }
}

//Retornar livro especifico
const getBook = async (req, res) =>{
  try{
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book)
  }catch (err){
    res.status(500).json({message: err.message})
  }
}

//Cadastro de livro
const createBook = async (req, res) =>{
  try{
  const book = await Book.create(req.body);
  res.status(200).json(book)
  }catch (err){
    res.status(500).json({message: err.message})
  }
}

//Atualiza um livro
const updateBook = async (req, res) =>{
  try{
    const {id} = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body)

    if(!book){
      return res.status(404).json({message: "Book not found"})
    }
    const updatedBook = await Book.findById(id)
    res.status(200).json(updatedBook)

  }catch (err){
    res.status(500).json({message: err.message})
  }
}

const deleteBook = async (req, res) =>{
  try{
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id)

    if(!book){
      return res.status(404).json({message: "Book not found"});
    }
    res.status(200).json({message: "Book deleted"})

  }catch (err){
    res.status(500).json({message: err.message})
  }
}


module.exports = {getBooks, getBook, createBook, updateBook, deleteBook}