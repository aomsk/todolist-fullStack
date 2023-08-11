import { Router } from "express";
import { getAllTodos } from "../controllers/todos";

// Create Router
export default (router: Router) => {
  router.get("/api/todos", getAllTodos);
};
