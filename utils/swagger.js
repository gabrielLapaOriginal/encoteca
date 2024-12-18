const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../package.json')

const options = {
  definition:{
    openapi: "3.0.0",
    info: {
      title: 'REST API Docs',
      version
    },
    components:{
      schemas: {
        Book: {
          type: 'object',
          properties: {
            title: { type: "string", description: "The title of the book" },
            author: { type: "string", description: "The author of the book" },
            publishedDate: { type: "string", format: 'date', description: "The publication date of the book" },
            genre: { type: "string", description: "The genre of the book" },
            summary: { type: "string", description: "A brief summary of the book" },
            price: { type: "number", description: "The price of the book" },
            image: { type: "string", description: "The image URL of the book cover" },
          },
          required: ["title", "author", "publishedDate", "genre", "summary", "price"], // Campos obrigatórios
        },
      },
      "respponses": {
        "200": {
          "description": "OK",
          "content": {
            "application/json": {
              "schema": {
                "items": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            }
          }
        },
        "404": {
          "description": "Book not found"
        },
        "500": {
          "description": "Internal Server Error "
        }
      },
      securitySchemes : {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/book.route.js"]
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
// Swagger page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//Docs in JSON format
app.get('/docs.json', (req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
})

  console.log(`Docs avalible at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs