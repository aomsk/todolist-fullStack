import { Router } from "express";
import {
  getAllTodos,
  searchTodosByStatus,
  createNewTodo,
  deleteTodoById,
} from "../controllers/todos";

// Create Router
export default (router: Router) => {
  router.get("/api/todos", getAllTodos);
  router.get("/api/todos/search/:status", searchTodosByStatus);
  router.post("/api/todos/", createNewTodo);
  router.delete("/api/todos/:id", deleteTodoById);
};
