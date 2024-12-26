const { getBooks, getBook, createBook, updateBook, updatefullBook, deleteBook } = require("../service/book.service");
const Book = require("../models/book.model");

jest.mock("../models/book.model");

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
      expect(res.status).toHaveBeenCalledWith(200);
    });
    
    it("Should return all books in the response", () => {
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });
    
    it("Should pass the mockBooks in the response", () => {
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
      expect(res.status).toHaveBeenCalledWith(500)
    });
    it("Should return a error message", () =>{
      expect(res.json).toHaveBeenCalledWith({message: errorMessage})
    });
  });
});

describe("Get one book controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = { params: { id: "123"}};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockBook = { title: 'Book 1' };

  describe("Get one book", () => {

    beforeEach(async () => {
      Book.findById.mockResolvedValue(mockBook);
      await getBook(req, res);
    });
    it("Should return status code 200", () =>{
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("Should pass the id of the book to the function", () => {
      expect(Book.findById).toHaveBeenCalledWith("123");
    });
    it("Should pass the correct book in the response", () => {
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
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("Should return a error message", () => {
      expect(res.json).toHaveBeenCalledWith({message: errorMessage});
    });
  });
});

describe("Post a book controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockBook = {title: "New book"}
  const req = { body: mockBook };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Post a book", () => {

    beforeEach(async () => {
      Book.create.mockResolvedValue(mockBook);
      await createBook(req, res);
    });

    it("Should return status code 200", () => {
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("Should pass the mockBook to the function", () => {
      expect(Book.create).toHaveBeenCalledWith(mockBook);
    });
    it("Should pass the mockBook in the response", () => {
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });
  });

  describe("Errors in Post a book", () => {
    const errorMessage = "Error creating book";
    beforeEach(async () =>{
      Book.create.mockRejectedValue(new Error(errorMessage));
      await createBook(req, res)
    });

    it("Should return status code of 500", () => {
      expect(res.status).toHaveBeenCalledWith(500)
    });
    it("Should return a message error", () => {
      expect(res.json).toHaveBeenCalledWith({message: errorMessage})
    })
  });
});

describe("Update part of a book controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
});

  const mockBook = { title: "Updated book" };
  const req = {params: {id: "123"}, body: {title: "Updated title"}};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Update part of a book", () =>{

    beforeEach(async() => {
      Book.findByIdAndUpdate.mockResolvedValue(mockBook);
      Book.findById.mockResolvedValue(mockBook);
      await updateBook(req, res)
    });

    it("Should return status code 200", () => {
      expect(res.status).toHaveBeenCalledWith(200)
    });
    it("Should pass the mockBook id and title to the function", () => {
      expect(Book.findByIdAndUpdate).toHaveBeenCalledWith("123", {title: "Updated title"})
    });
    it("Should pass the mockBook in the response", () => {
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });
  });

  describe("Errors in update part of a book", () =>{
    beforeEach(async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);
      await updateBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status).toHaveBeenCalledWith(404)
    });
    it("Should return a error message", () => {
      expect(res.json).toHaveBeenCalledWith({message: "Book not found"})
    });
  });
});

describe("Update full book controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockBook = {title: "Updated book"};
  const req = { params: {id: "123"}, body: {title: "Updated title"} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Update full book", () => {
    beforeEach(async() => {
      Book.findByIdAndUpdate.mockResolvedValue(mockBook);
      Book.findById.mockResolvedValue(mockBook);
      await updatefullBook(req, res);
    });
    it("Should return status code of 200", () => {
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("Should pass the mockBook id and title to the function", () => {
      expect(Book.findByIdAndUpdate).toHaveBeenCalledWith("123", {title: "Updated title"});
    });
    it("Should pass the mockBook in the response", () => {
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });
  });
  describe("Errors in update full book", () => {
    beforeEach(async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);
      await updateBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status).toHaveBeenCalledWith(404)
    });
    it("Should return a error message", () => {
      expect(res.json).toHaveBeenCalledWith({message: "Book not found"})
    });
  });
});

describe("Delete a book controller", () =>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockBook = { id: "123", title: "Deleted book" };
  const req = { params: {id: "123"} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  describe("Delete a book", () => {
    beforeEach(async() => {
      Book.findByIdAndDelete.mockResolvedValue(mockBook);
      await deleteBook(req, res);
    });

    it("Should return status code of 200", () => {
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("Should pass the mockBook id to the function", () => {
      expect(Book.findByIdAndDelete).toHaveBeenCalledWith("123");
    });
    it("Should return a confirmation message", () => {
      expect(res.json).toHaveBeenCalledWith({message: "Book deleted"})
    });
  });

  describe("Errors in delete a book", () => {
    beforeEach(async () => {
      Book.findByIdAndDelete.mockResolvedValue(null);
      await deleteBook(req, res);
    });

    it("Should return status code of 404", () => {
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("Should return a not found message", () => {
      expect(res.json).toHaveBeenCalledWith({message: "Book not found"});
    });
  });
});