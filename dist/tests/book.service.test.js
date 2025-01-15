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
const book_service_1 = __importDefault(require("../service/book.service"));
const { getBooks, getBook, createBook, updateBook, updatefullBook, deleteBook } = book_service_1.default;
const book_model_1 = __importDefault(require("../models/book.model"));
jest.mock("../models/book.model");
const mockBook = { title: "Book 1", id: "123", author: "old author" };
describe("Get all books Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
    describe("Get all books", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.find.mockResolvedValue(mockBooks);
            yield getBooks(req, res);
        }));
        it("Should return status code 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should return all books", () => {
            expect(res.json.mock.calls[0][0]).toEqual(mockBooks);
        });
    });
    describe("Errors in get all books", () => {
        const errorMessage = "Error fetching books";
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.find.mockRejectedValue(new Error(errorMessage));
            yield getBooks(req, res);
        }));
        it("Should return status code 500", () => {
            expect(res.status.mock.calls[0][0]).toBe(500);
        });
        it("Should return a error message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: errorMessage });
        });
    });
});
describe("Get one book controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const req = { params: { id: "123" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    describe("Get one book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findById.mockResolvedValue(mockBook);
            yield getBook(req, res);
        }));
        it("Should return status code 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should pass get the book with the right ID", () => {
            expect(book_model_1.default.findById).toHaveBeenCalledWith("123");
        });
        it("Should return the right book", () => {
            expect(res.json.mock.calls[0][0]).toEqual(mockBook);
        });
    });
    describe("Errors in get one book", () => {
        const errorMessage = "Error fetching book";
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findById.mockRejectedValue(new Error(errorMessage));
            yield getBook(req, res);
        }));
        it("Should return status code of 500", () => {
            expect(res.status.mock.calls[0][0]).toBe(500);
        });
        it("Should return a error message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: errorMessage });
        });
    });
});
describe("Post a book controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const req = { body: mockBook };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    describe("Post a book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.create.mockResolvedValue(mockBook);
            yield createBook(req, res);
        }));
        it("Should return status code 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should create a new book sucefully", () => {
            expect(book_model_1.default.create.mock.calls[0][0]).toEqual(mockBook);
        });
        it("Should return the created book", () => {
            expect(res.json.mock.calls[0][0]).toEqual(mockBook);
        });
    });
    describe("Errors in Post a book", () => {
        const errorMessage = "Error creating book";
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.create.mockRejectedValue(new Error(errorMessage));
            yield createBook(req, res);
        }));
        it("Should return status code of 500", () => {
            expect(res.status.mock.calls[0][0]).toBe(500);
        });
        it("Should return a message error", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: errorMessage });
        });
    });
});
describe("Update part of a book controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const req = { params: { id: "123" }, body: { title: "Updated title" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    describe("Update part of a book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndUpdate.mockResolvedValue(mockBook);
            book_model_1.default.findById.mockResolvedValue(mockBook);
            yield updateBook(req, res);
        }));
        it("Should return status code 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should update the book with the new title", () => {
            const [calledId, updateBody] = book_model_1.default.findByIdAndUpdate.mock.calls[0];
            expect(calledId).toBe("123");
            expect(updateBody).toEqual({ title: "Updated title" });
        });
        it("Should return the updated book", () => {
            expect(res.json.mock.calls[0][0]).toEqual(mockBook);
        });
    });
    describe("Errors in update part of a book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndUpdate.mockResolvedValue(null);
            yield updateBook(req, res);
        }));
        it("Should return status code of 404", () => {
            expect(res.status.mock.calls[0][0]).toBe(404);
        });
        it("Should return a error message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: "Book not found" });
        });
    });
});
describe("Update full book controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const req = { params: { id: "123" }, body: { title: "Updated title", author: "New author" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    describe("Update full book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndUpdate.mockResolvedValue(mockBook);
            book_model_1.default.findById.mockResolvedValue(mockBook);
            yield updatefullBook(req, res);
        }));
        it("Should return status code of 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should update the full book (title and author)", () => {
            const [calledId, updatedBody] = book_model_1.default.findByIdAndUpdate.mock.calls[0];
            expect(calledId).toBe("123");
            expect(updatedBody).toEqual({ title: "Updated title", author: "New author" });
        });
        it("Should return the updated book", () => {
            expect(res.json.mock.calls[0][0]).toEqual(mockBook);
        });
    });
    describe("Errors in update full book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndUpdate.mockResolvedValue(null);
            yield updateBook(req, res);
        }));
        it("Should return status code of 404", () => {
            expect(res.status.mock.calls[0][0]).toBe(404);
        });
        it("Should return a error message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: "Book not found" });
        });
    });
});
describe("Delete a book controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const deletedMockBook = { id: "123", title: "Deleted book" };
    const req = { params: { id: "123" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    describe("Delete a book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndDelete.mockResolvedValue(deletedMockBook);
            yield deleteBook(req, res);
        }));
        it("Should return status code of 200", () => {
            expect(res.status.mock.calls[0][0]).toBe(200);
        });
        it("Should delete the book with the id passed", () => {
            expect(book_model_1.default.findByIdAndDelete.mock.calls[0][0]).toBe("123");
        });
        it("Should return a confirmation message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: "Book deleted" });
        });
    });
    describe("Errors in delete a book", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            book_model_1.default.findByIdAndDelete.mockResolvedValue(null);
            yield deleteBook(req, res);
        }));
        it("Should return status code of 404", () => {
            expect(res.status.mock.calls[0][0]).toBe(404);
        });
        it("Should return a not found message", () => {
            expect(res.json.mock.calls[0][0]).toEqual({ message: "Book not found" });
        });
    });
});
