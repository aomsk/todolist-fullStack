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
export const createTodo = (values: Record<string, any>) => {
  const newTodo = new TodoModel(values)
    .save()
    .then((todo) => todo.toObject())
    .catch((error) => console.log(error));
  return newTodo;
};
export const deleteTodoByID = (id: string) => TodoModel.findByIdAndDelete({ _id: id });
export const updateTodoByID = (id: string, values: Record<string, any>) =>
  TodoModel.findByIdAndUpdate(id, values);
