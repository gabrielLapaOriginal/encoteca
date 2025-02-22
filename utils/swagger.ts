import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';
import { Application, Request, Response } from 'express';

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
          type: "object",
          properties: {
            title: { type: "string", description: "The title of the book" },
            author: { type: "string", description: "The author of the book" },
            publishedDate: { type: "string", format: 'date', description: "The publication date of the book" },
            genre: { type: "string", description: "The genre of the book" },
            summary: { type: "string", description: "A brief summary of the book" },
            price: { type: "number", description: "The price of the book" },
            image: { type: "string", description: "The image URL of the book cover" },
          },
          required: ["title", "author", "publishedDate", "genre", "summary", "price"],
        },
        Author: {
          type: "object",
          properties: {
            name: {type: "string", description: "The name of the author"},
            birthDate: {type: "string", format: "date", description: "The birth date of the author"},
            nationality: {type: "string", description: "The nationality of the author"},
            image: {type: "string", description: "The image URL of the author"},
            genres: {type: "array", items: {type: "string"}, description: "Genres the author specializes in"},
          },
          required: ["name","birthDate", "nationality", "image", "genres"],
        },
      },
      "responses": {
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
          "description": "Not found"
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
  apis: ["./routes/book.route.ts", "./routes/author.route.ts"]
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Application, port: number) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs