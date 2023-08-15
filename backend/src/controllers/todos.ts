import { Request, Response } from "express";
import { getTodos, createTodo, deleteTodo, updateTodo, getTodoByID } from "../model/todos";

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
        .json({ message: "GET todo by status complete", search: "complete", todos: todoComplete });
    } else if (status === "notcomplete") {
      const todoNotComplete = todos.filter((todo) => todo.complete === false);
      return res.status(200).json({
        message: "GET todo by status not-complete",
        search: "notcomplete",
        todos: todoNotComplete,
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
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Please enter title field" });
    }
    const todo = await createTodo({
      title,
      complete: false,
    });
    return res.status(201).json({ message: "Create new Todo Successfuly", todo }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await getTodoByID(id);
    if (todo) {
      const delete_todo = await deleteTodo(id);
      return res.status(200).json({ message: "Delete Todo Successfuly", delete_todo }).end();
    }
    return res.status(404).json({ message: "ID Not Found", id }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const options = { new: true }; // ให้ส้งค่าที่ update ใหม่กลับบมา
    const update_todo = await updateTodo(id, body, options);
    return res.status(200).json({ message: "Update Todo Successfuly", data: update_todo }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
