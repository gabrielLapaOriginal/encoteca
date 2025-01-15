import Book from "../models/book.model"
import {Request, Response} from 'express'


class BookController{
  //Retorna todos os livros
  getBooks = async (req:Request, res:Response): Promise<any> =>{
    try{
      const page = Number(req.query.p) || 0;
      const booksPerPage = 3;
  
      const books = page ? await Book.find({}).skip(page * booksPerPage).limit(booksPerPage) : await Book.find({});
      res.status(200).json(books);
    }catch (err){
      if(err instanceof Error){
        res.status(500).json({message: err.message});
      }else{
        res.status(500).json({message: "An unknown error ocurred"})
      };
    };
  };
  
  //Retornar livro especifico
  getBook = async (req:Request, res:Response): Promise<any> =>{
    try{
      const { id } = req.params;
      const book = await Book.findById(id);
      res.status(200).json(book);
    }catch (err){
      if(err instanceof Error) {
        res.status(500).json({message: err.message});
      }else{
        res.status(500).json({message: "An unknown error ocurred"})
      };
    };
  };
  
  //Cadastro de livro
  createBook = async (req:Request, res:Response): Promise<any> =>{
    try{
    const book = await Book.create(req.body);
    res.status(200).json(book);
    }catch (err){
      if(err instanceof Error) {
        res.status(500).json({message: err.message});
      }else{
        res.status(500).json({message: "An unknown error ocurred"})
      }
    }
  };
  
  //atualiza parte de um livro
  updateBook = async (req:Request, res:Response): Promise<any> =>{
    try{
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body);
  
      if(!book){
        return res.status(404).json({message: "Book not found"});
      }
      const updatedBook = await Book.findById(id);
      res.status(200).json(updatedBook);
  
    }catch (err){
      if(err instanceof Error){
        res.status(500).json({message: err.message});
      }else{
        res.status(500).json({message: "An unknown error ocurred"})
      };
    };
  };
  
  //Atualiza um livro inteiro
  updatefullBook = async (req:Request, res:Response): Promise<any> =>{
    try{
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body);
  
      if(!book){
        return res.status(404).json({message: "Book not found"});
      }
      const updatedBook = await Book.findById(id);
      return res.status(200).json(updatedBook);
  
    }catch (err){
      if(err instanceof Error){
        return res.status(500).json({message: err.message});
      }else{
        return res.status(500).json({message: "An unknown error ocurred"})
      };
    };
  };
  
  deleteBook = async (req:Request, res:Response): Promise<any> =>{
    try{
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id)
  
      if(!book){
        return res.status(404).json({message: "Book not found"});
      }
      res.status(200).json({message: "Book deleted"});
  
    }catch (err){
      if(err instanceof Error){
        res.status(500).json({message: err.message});
      }else{
        res.status(500).json({message: "An unknown error ocurred"})
      }
    }
  };
}




export default new BookController();