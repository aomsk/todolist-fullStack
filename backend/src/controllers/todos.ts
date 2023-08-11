import { Request, Response } from "express";
import { getTodos } from "../db/todos";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    return res.status(200).json({ message: "GET all todos", todos });
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const searchTodosByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const todos = await getTodos();

    if (status === "complete") {
      const todoComplete = todos.filter((todo) => todo.complete === true);
      return res
        .status(200)
        .json({ message: "GET todo by status complete", status: "complete", todoComplete });
    } else if (status === "notcomplete") {
      const todoNotComplete = todos.filter((todo) => todo.complete === false);
      return res.status(200).json({
        message: "GET todo by status not-complete",
        status: "notcomplete",
        todoNotComplete,
      });
    } else {
      return res.status(404).json({ message: "Not found status" });
    }
  } catch (error) {
    return res.sendStatus(400);
  }
};
