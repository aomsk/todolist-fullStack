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
