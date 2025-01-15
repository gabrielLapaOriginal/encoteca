"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please insert a title"],
    },
    author: {
        type: String,
        required: [true, "Please insert the books author"],
    },
    publishedDate: {
        type: Date,
        required: [true, "Please insert the publishing date"],
    },
    genre: {
        type: String,
        required: [true, "Please insert the genre"],
    },
    summary: {
        type: String,
        required: [true, "Please insert the summary"],
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
const Book = mongoose_1.default.model("Book", BookSchema);
exports.default = Book;
