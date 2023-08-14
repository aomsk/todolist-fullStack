import { Router } from "express";
import { getAllTodos, searchTodosByStatus, createNewTodo } from "../controllers/todos";

// Create Router
export default (router: Router) => {
  router.get("/api/todos", getAllTodos);
  router.get("/api/todos/search/:status", searchTodosByStatus);
  router.post("/api/todos/", createNewTodo);
};
