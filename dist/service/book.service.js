"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../models/book.model"));
class BookController {
    constructor() {
        //Retorna todos os livros
        this.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.p) || 0;
                const booksPerPage = 3;
                const books = page ? yield book_model_1.default.find({}).skip(page * booksPerPage).limit(booksPerPage) : yield book_model_1.default.find({});
                res.status(200).json(books);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error ocurred" });
                }
                ;
            }
            ;
        });
        //Retornar livro especifico
        this.getBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield book_model_1.default.findById(id);
                res.status(200).json(book);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error ocurred" });
                }
                ;
            }
            ;
        });
        //Cadastro de livro
        this.createBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_model_1.default.create(req.body);
                res.status(200).json(book);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error ocurred" });
                }
            }
        });
        //atualiza parte de um livro
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield book_model_1.default.findByIdAndUpdate(id, req.body);
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                const updatedBook = yield book_model_1.default.findById(id);
                res.status(200).json(updatedBook);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error ocurred" });
                }
                ;
            }
            ;
        });
        //Atualiza um livro inteiro
        this.updatefullBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield book_model_1.default.findByIdAndUpdate(id, req.body);
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                const updatedBook = yield book_model_1.default.findById(id);
                return res.status(200).json(updatedBook);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "An unknown error ocurred" });
                }
                ;
            }
            ;
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield book_model_1.default.findByIdAndDelete(id);
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                res.status(200).json({ message: "Book deleted" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error ocurred" });
                }
            }
        });
    }
}
exports.default = new BookController();
