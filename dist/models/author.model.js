"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AuthorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please insert the authors name"]
    },
    birthDate: {
        type: Date,
        required: [true, "Please enter the author's date of birth"]
    },
    nationality: {
        type: String,
        required: [true, "Please enter the author's nationality"]
    },
    image: {
        type: String,
        required: false
    },
    genres: {
        type: [String],
        required: [true, "Please insert the genres the author writes "]
    },
}, {
    timestamps: true,
});
const Author = mongoose_1.default.model("Author", AuthorSchema);
exports.default = Author;
