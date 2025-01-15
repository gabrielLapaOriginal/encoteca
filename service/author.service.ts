import Author from "../models/author.model";
import Book from "../models/book.model";
import {Request, Response} from "express"

class AuthorController{

//Retorna todos os autores
  getAuthors = async(req:Request, res:Response) => {
  try{
    const filter = req.query || {}
    const authors = await Author.find(filter);

    if(!authors.length){
      res.status(404).json({message: "No authors found"})
    }
    res.status(200).json(authors);
  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message});
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};

//Retorna um autor especifico
  getAuthor = async(req:Request, res:Response) => {
  try{
    const { id } = req.params;
    const author = await Author.findById(id);

    if(!author){
      return res.status(404).json({message: "Author not found"});
    }
    const books = await Book.find({author: author.name})
    res.status(200).json({
      ...author.toObject(),
      books
    });
  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message})
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};

//Cadastro de autores
  createAuthor = async(req:Request, res:Response) => {
  try{
    const author = await Author.create(req.body);
    res.status(200).json(author)
  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message})
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};

//Atualiza parte de um autor
  updateAuthor = async(req:Request, res:Response) => {
  try{
    const { id } = req.params;
    const author = await Author.findByIdAndUpdate(id, req.body);

    if(!author){
      return res.status(404).json({message: "Author not found"})
    };
    const updatedAuthor = await Author.findById(id);
    res.status(200).json(updatedAuthor);

  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message})
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};

//Atualiza um autor inteiro
  updateFullAuthor = async(req:Request, res:Response) => {
  try{
    const { id } = req.params;
    const author = await Author.findByIdAndUpdate(id, req.body);

    if(!author){
      return res.status(404).json({message: "Author not found"})
    };
    const updatedAuthor = await Author.findById(id);
    res.status(200).json(updatedAuthor);

  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message})
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};

//Deleta um autor
  deleteAuthor = async(req:Request, res:Response) => {
  try{
    const {id} = req.params;
    const author = await Author.findByIdAndDelete(id);

    if(!author){
      return res.status(404).json({message: "Author not found"});
    };
    res.status(200).json({message: "Book deleted"});
  }catch(err){
    if(err instanceof Error){
      res.status(500).json({message: err.message})
    }else{
      res.status(500).json({message: "An unknown error ocurred"})
    }
  }
};
}

export default new AuthorController()