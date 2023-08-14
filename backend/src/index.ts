import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./router"; // router
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(express.json()); // use middleware swagger

// Connect MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on("error", (error) => {
  console.log(`MongoDB is not connected with error: ${error}`);
});
mongoose.connection.once("connected", () => {
  console.log("MongoDB is connected 🎉");
});

// Help Check
app.get("/help", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello Check Check!!!", status: "OK" });
});

// Use Router
/**
 *  @swagger
 *  /api/todos:
 *    get:
 *      summary: Get All Todos
 *      description: Get All Todos
 */
/**
 *  @swagger
 *  /api/todos/search/:status:
 *    get:
 *      summary: Get Todos by status
 *      description: Search Todos by status
 *      parameters:
 *        - in: path
 *          name: status
 *          required: true
 *          description: Status is type String
 *          schema:
 *            type: string
 */
/**
 * @swagger
 * /api/todos:
 *    post:
 *      summary: Creat a new Todo
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                complete:
 *                  type: boolean
 */
/**
 *  @swagger
 *  /api/todos/:id:
 *    delete:
 *      summary: Delete Todos by id
 *      description: Delete Todos by id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID is type integer
 *          schema:
 *            type: integer
 */
/**
 *  @swagger
 *  /api/todos/:id:
 *    patch:
 *      summary: Update Todos by id
 *      description: Update Todos by id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID is type integer
 *          schema:
 *            type: integer
 */
app.use("/", router());

// Swaager
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "TodoList API Documentation",
    },
    servers: [{ url: "http://localhost:3000/", description: "Development server" }],
  },
  apis: ["./src/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
