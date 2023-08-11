import { Router } from "express";
import { getAllTodos, searchTodosByStatus } from "../controllers/todos";

// Create Router
export default (router: Router) => {
  router.get("/api/todos", getAllTodos);
  router.get("/api/todos/search/:status", searchTodosByStatus);
};
