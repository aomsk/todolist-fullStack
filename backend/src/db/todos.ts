import mongoose from "mongoose";

// Create Todos Schema
const TodoSchema = new mongoose.Schema({
  title: { type: "string", require: true },
  complete: { type: "boolean", require: true },
});

// Create Todos Collection
export const TodoModel = mongoose.model("Todos", TodoSchema);

// Actions
export const getTodos = () => TodoModel.find();
