const { getBooks, getBook, createBook, updateBook, updatefullBook, deleteBook } = require("../service/book.service");
const Book = require("../models/book.model");

jest.mock("../models/book.model");

const mockBook = {title: "Book 1", id: "123", author: "old author"};

describe("Get all books Controller", () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = { query: {}};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockBooks = [{title: 'Book 1'}, {title: 'Book 2'}];

  describe("Get all books", () => {

    beforeEach(async () => {
      Book.find.mockResolvedValue(mockBooks);
      await getBooks(req, res);
    });

    it("Should return status code 200", () =>{
      expect(res.status.mock.calls[0][0]).toBe(200);
    });
    
    it("Should return all books", () => {
      expect(res.json.mock.calls[0][0]).toEqual(mockBooks);
    });

  });

  describe("Errors in get all books", () => {
    const errorMessage = "Error fetching books";

    beforeEach(async () => {
      Book.find.mockRejectedValue(new Error(errorMessage));
      await getBooks(req, res);
    });

    it("Should return status code 500", () =>{
      expect(res.status.mock.calls[0][0]).toBe(500);
    });
    it("Should return a error message", () =>{
      expect(res.json.mock.calls[0][0]).toEqual({message: errorMessage});
    });
  });
});

describe("Get one book controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = { params: { id: "123"}};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Get one book", () => {

    beforeEach(async () => {
      Book.findById.mockResolvedValue(mockBook);
      await getBook(req, res);
    });
    it("Should return status code 200", () =>{
      expect(res.status.mock.calls[0][0]).toBe(200);
    });

    it("Should pass get the book with the right ID", () => {
      expect(Book.findById).toHaveBeenCalledWith("123");
    });
    it("Should return the right book", () => {
      expect(res.json.mock.calls[0][0]).toEqual(mockBook);
    });
  }); 

  describe("Errors in get one book", () => {
    const errorMessage = "Error fetching book"
    
    beforeEach(async () => {
      Book.findById.mockRejectedValue(new Error(errorMessage));
      await getBook(req, res);
    });

    it("Should return status code of 500", () => {
      expect(res.status.mock.calls[0][0]).toBe(500);
    });
    it("Should return a error message", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: errorMessage});
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

    beforeEach(async () => {
      Book.create.mockResolvedValue(mockBook);
      await createBook(req, res);
    });

    it("Should return status code 200", () => {
      expect(res.status.mock.calls[0][0]).toBe(200);
    });
    it("Should create a new book sucefully", () => {
      expect(Book.create.mock.calls[0][0]).toEqual(mockBook);
    });
    it("Should return the created book", () => {
      expect(res.json.mock.calls[0][0]).toEqual(mockBook);
    });
  });

  describe("Errors in Post a book", () => {
    const errorMessage = "Error creating book";
    beforeEach(async () =>{
      Book.create.mockRejectedValue(new Error(errorMessage));
      await createBook(req, res);
    });

    it("Should return status code of 500", () => {
      expect(res.status.mock.calls[0][0]).toBe(500);
    });
    it("Should return a message error", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: errorMessage})
    })
  });
});

describe("Update part of a book controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
});

  const req = {params: {id: "123"}, body: {title: "Updated title"}};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Update part of a book", () =>{

    beforeEach(async() => {
      Book.findByIdAndUpdate.mockResolvedValue(mockBook);
      Book.findById.mockResolvedValue(mockBook);
      await updateBook(req, res);
    });

    it("Should return status code 200", () => {
      expect(res.status.mock.calls[0][0]).toBe(200);
    });
    it("Should update the book with the new title", () => {
      const [calledId, updateBody] = Book.findByIdAndUpdate.mock.calls[0]
      expect(calledId).toBe("123");
      expect(updateBody).toEqual({ title: "Updated title" });
    });
    it("Should return the updated book", () => {
      expect(res.json.mock.calls[0][0]).toEqual(mockBook);
    });
  });

  describe("Errors in update part of a book", () =>{
    beforeEach(async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);
      await updateBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status.mock.calls[0][0]).toBe(404);
    });
    it("Should return a error message", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: "Book not found"});
    });
  });
});

describe("Update full book controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = { params: {id: "123"}, body: {title: "Updated title", author: "New author"} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Update full book", () => {
    beforeEach(async() => {
      Book.findByIdAndUpdate.mockResolvedValue(mockBook);
      Book.findById.mockResolvedValue(mockBook);
      await updatefullBook(req, res);
    });
    it("Should return status code of 200", () => {
      expect(res.status.mock.calls[0][0]).toBe(200);
    });
    it("Should update the full book (title and author)", () => {
      const [calledId, updatedBody] = Book.findByIdAndUpdate.mock.calls[0]
      expect(calledId).toBe("123");
      expect(updatedBody).toEqual({ title: "Updated title", author: "New author"});
    });
    it("Should return the updated book", () => {
      expect(res.json.mock.calls[0][0]).toEqual(mockBook);
    });
  });
  describe("Errors in update full book", () => {
    beforeEach(async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);
      await updateBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status.mock.calls[0][0]).toBe(404);
    });
    it("Should return a error message", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: "Book not found"});
    });
  });
});

describe("Delete a book controller", () =>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  const deletedMockBook = { id: "123", title: "Deleted book" };
  const req = { params: {id: "123"} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Delete a book", () => {
    beforeEach(async() => {
      Book.findByIdAndDelete.mockResolvedValue(deletedMockBook);
      await deleteBook(req, res);
    });

    it("Should return status code of 200", () => {
      expect(res.status.mock.calls[0][0]).toBe(200);
    });
    it("Should delete the book with the id passed", () => {
      expect(Book.findByIdAndDelete.mock.calls[0][0]).toBe("123");
    });
    it("Should return a confirmation message", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: "Book deleted"});
    });
  });

  describe("Errors in delete a book", () => {
    beforeEach(async () => {
      Book.findByIdAndDelete.mockResolvedValue(null);
      await deleteBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status.mock.calls[0][0]).toBe(404);
    });
    it("Should return a not found message", () => {
      expect(res.json.mock.calls[0][0]).toEqual({message: "Book not found"});
    });
  });
});