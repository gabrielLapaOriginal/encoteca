const express = require("express");
const router = express.Router()
const { getBooks, getBook, createBook, updatefullBook, deleteBook } = require('../service/book.service.js')

/** 
 * @openapi
 * /api/books/:
 *   get:
 *     tags:
 *       - Books
 *     description: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Retrieve a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "675b18533a27472a31f5b283"
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
/**
 * @openapi
 * /api/books/:
 *   post:
 *     tags:
 *       - Books
 *     description: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 */
/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     description: Update a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "675b18533a27472a31f5b283"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     description: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "675b18533a27472a31f5b283"
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook)
router.put('/:id', updatefullBook)
router.delete('/:id', deleteBook)


module.exports = router;