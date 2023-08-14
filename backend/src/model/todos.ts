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
export const getTodoByID = (id: string) => TodoModel.findById({ _id: id });
export const createTodo = (values: Record<string, any>) => {
  const newTodo = new TodoModel(values)
    .save()
    .then((todo) => todo.toObject())
    .catch((error) => console.log(error));
  return newTodo;
};
export const deleteTodo = (id: string) => TodoModel.findByIdAndDelete({ _id: id });
export const updateTodo = (id: string, values: Record<string, any>, options: Object) =>
  TodoModel.findByIdAndUpdate(id, values, options);
