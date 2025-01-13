const Author = require("../models/author.model")
const Book = require("../models/book.model")

//Retorna todos os autores
const getAuthors = async(req, res) => {
  try{
    const filter = req.query || {}
    const authors = await Author.find(filter);

    if(!authors.length){
      res.status(404).json({message: "No authors found"})
    }

    res.status(200).json(authors);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

//Retorna um autor especifico
const getAuthor = async(req, res) => {
  try{
    const { id } = req.params;
    const author = await Author.findById(id);

    if(!author){
      res.status(404).json({message: "Author not found"});
    }
    const books = await Book.find({author: author.name})
    res.status(200).json({
      ...author.toObject(),
      books
    });
  }catch(err){
    res.status(500).json({message: err.message})
  }
};

//Cadastro de autores
const createAuthor = async(req, res) => {
  try{
    const author = await Author.create(req.body);
    res.status(200).json(author)
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

//Atualiza parte de um autor
const updateAuthor = async(req, res) => {
  try{
    const { id } = req.params;
    const author = await Author.findByIdAndUpdate(id, req.body);

    if(!author){
      return res.status(404).json({message: "Author not found"})
    };
    const updatedAuthor = await Author.findById(id);
    res.status(200).json(updatedAuthor);

  }catch(err){
    res.status(500).json({message: err.messaage})
  }
};

//Atualiza um autor inteiro
const updateFullAuthor = async(req, res) => {
  try{
    const { id } = req.params;
    const author = await Author.findByIdAndUpdate(id, req.body);

    if(!author){
      return res.status(404).json({message: "Author not found"})
    };
    const updatedAuthor = await Author.findById(id);
    res.status(200).json(updatedAuthor);

  }catch(err){
    res.status(500).json({message: err.messaage})
  }
};

//Deleta um autor
const deleteAuthor = async(req, res) => {
  try{
    const {id} = req.params;
    const author = await Author.findByIdAndDelete(id);

    if(!author){
      return res.status(404).json({message: "Author not found"});
    };
    res.status(200).json({message: "Book deleted"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}


module.exports = {getAuthors, getAuthor, createAuthor, updateAuthor, updateFullAuthor, deleteAuthor};