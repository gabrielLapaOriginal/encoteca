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
const author_model_1 = __importDefault(require("../models/author.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
class AuthorController {
    constructor() {
        //Retorna todos os autores
        this.getAuthors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = req.query || {};
                const authors = yield author_model_1.default.find(filter);
                if (!authors.length) {
                    res.status(404).json({ message: "No authors found" });
                }
                res.status(200).json(authors);
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
        //Retorna um autor especifico
        this.getAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const author = yield author_model_1.default.findById(id);
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                const books = yield book_model_1.default.find({ author: author.name });
                res.status(200).json(Object.assign(Object.assign({}, author.toObject()), { books }));
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
        //Cadastro de autores
        this.createAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield author_model_1.default.create(req.body);
                res.status(200).json(author);
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
        //Atualiza parte de um autor
        this.updateAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const author = yield author_model_1.default.findByIdAndUpdate(id, req.body);
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                ;
                const updatedAuthor = yield author_model_1.default.findById(id);
                res.status(200).json(updatedAuthor);
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
        //Atualiza um autor inteiro
        this.updateFullAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const author = yield author_model_1.default.findByIdAndUpdate(id, req.body);
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                ;
                const updatedAuthor = yield author_model_1.default.findById(id);
                res.status(200).json(updatedAuthor);
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
        //Deleta um autor
        this.deleteAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const author = yield author_model_1.default.findByIdAndDelete(id);
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                ;
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
exports.default = new AuthorController();
