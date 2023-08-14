import { useEffect, useRef, useState, FormEvent } from "react";
import TodoComponent from "./components/TodoComponent";
import ButtonsComponent from "./components/ButtonsComponent";

export interface Todo {
  id: number;
  todo: string;
  complete: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [complete, setComplete] = useState(false);
  const [btnAll, setBtnAll] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  });

  // Add New Todo
  const handleAdd = (event: FormEvent) => {
    event.preventDefault(); // เมื่อกด form submit จะไม่ทำการ refresh หน้า
    if (inputRef.current?.value.length === 0) {
      return;
    }
    setTodos((previousTodos) => [
      ...previousTodos,
      {
        id: Date.now(),
        todo: `${inputRef.current?.value}`,
        complete: false,
      },
    ]);
    setTodo("");
  };

  // Toggle Complete
  const toggleComplete = (id: number) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo))
    );
  };

  // Update Todo
  const updateTodo = (id: number) => {
    todos.map((todo) => {
      if (todo.id === id) {
        const newValue = prompt("Please edit your todo:", todo.todo);
        if (newValue !== null && newValue !== undefined && newValue !== "") {
          setTodos((previousTodos) =>
            previousTodos.map((todo) => (todo.id === id ? { ...todo, todo: newValue } : todo))
          );
        } else {
          return todo;
        }
        console.log("todo | complete: ", todo.todo, todo.complete);
      }
    });
  };

  // Delete Todo
  const deleteTodo = (id: number) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col flex-wrap mt-10">
      <h1 className="text-xl xl:text-[30px] font-bold mb-5 text-center">
        Todo Lists With React + Typescript
      </h1>
      <div className="w-fit flex justify-center">
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name=""
            ref={inputRef}
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="w-[200px] md:w-[300px] xl:w-[400px] border-2 border-solid border-black rounded-lg p-1 mr-1"
          />
          <button
            type="submit"
            id="btn-add-new"
            className="border-2 border-solid border-black rounded-lg bg-black text-white px-5 py-1.5 mr-1"
          >
            Add New
          </button>
        </form>
      </div>
      <div>
        <ButtonsComponent setComplete={setComplete} setBtnAll={setBtnAll} />
      </div>
      <div className="flex flex-wrap flex-col mt-3">
        <p className="font-bold text-center">
          All Todos ({todos.length}) | {btnAll ? "#All" : complete ? "#Complete" : "#Not Complete"}
        </p>
        {btnAll
          ? todos.map((todo) => {
              return (
                <TodoComponent
                  key={todo.id}
                  id={todo.id}
                  todo={todo.todo}
                  complete={todo.complete}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              );
            })
          : todos
              .filter((todo) => todo.complete === complete)
              .map((filteredTodo) => {
                return (
                  <TodoComponent
                    key={filteredTodo.id}
                    id={filteredTodo.id}
                    todo={filteredTodo.todo}
                    complete={filteredTodo.complete}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default App;
