import { Request, Response } from "express";
import { getTodos, createTodo, deleteTodoByID } from "../model/todos";

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

export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { title, complete } = req.body;
    if (!title || complete === "") {
      return res.status(400).json({ message: "Please enter title field" });
    }
    const todo = await createTodo({
      title,
      complete,
    });
    return res.status(200).json({ message: "Create new Todo Successfuly", todo }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteTodo = await deleteTodoByID(id);
    return res.status(200).json({ message: "Delete Todo Successfuly", deleteTodo }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
