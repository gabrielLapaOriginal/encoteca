const express = require("express");
const router = express.Router();
import AuthorController from "../service/author.service";

/** 
 * @openapi
 * /api/authors/:
 *   get:
 *     tags:
 *       - Authors
 *     description: Retrieve all authors
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Authors'
 */
/**
 * @openapi
 * /api/authors/{id}:
 *   get:
 *     tags:
 *       - Authors
 *     description: Retrieve a author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "675b18533a27472a31f5b283"
 *     responses:
 *       200:
 *         description: A single authors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authors'
 *       404:
 *         description: author not found
 */
/**
 * @openapi
 * /api/authors/:
 *   post:
 *     tags:
 *       - Authors
 *     description: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 */
/**
 * @openapi
 * /api/authors/{id}:
 *   put:
 *     tags:
 *       - Authors
 *     description: Update a full author by ID
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 */
/**
 * @openapi
 * /api/authors/{id}:
 *   patch:
 *     tags:
 *       - Authors
 *     description: Update a author by ID
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 */
/**
 * @openapi
 * /api/authors/{id}:
 *   delete:
 *     tags:
 *       - Authors
 *     description: Delete a author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "675b18533a27472a31f5b283"
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */

router.get("/authors", AuthorController.getAuthors);
router.get("/authors/:id", AuthorController.getAuthor);
router.post("/authors", AuthorController.createAuthor);
router.put("/authors/:id", AuthorController.updateFullAuthor);
router.patch("/authors/:id", AuthorController.updateAuthor);
router.delete("/authors/:id", AuthorController.deleteAuthor);


export default router