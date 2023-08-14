import { Router } from "express";
import {
  getAllTodos,
  searchTodosByStatus,
  createNewTodo,
  deleteTodoById,
  updateTodoById,
} from "../controllers/todos";

const router = Router();

// Create Router
router.get("/api/todos", getAllTodos);
router.get("/api/todos/search/:status", searchTodosByStatus);
router.post("/api/todos/", createNewTodo);
router.delete("/api/todos/:id", deleteTodoById);
router.patch("/api/todos/:id", updateTodoById);

export default router;
