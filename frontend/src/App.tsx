import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

// Interface
import { ITodo } from "./utils/todoInterface";

// Components
import TodoComponent from "./components/TodoComponent";
import ButtonsComponent from "./components/ButtonsComponent";
import FormInput from "./components/FormInput";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [searchTodo, setSearchTodo] = useState<string>("all");

  useEffect(() => {
    getAllTodos();
  }, []);

  // Get All Todos
  const getAllTodos = async () => {
    await axios
      .get("http://localhost:3000/api/todos")
      .then((response) => {
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Search Todo By Status
  const handleSearchTodo = async (search: string) => {
    await axios
      .get(`http://localhost:3000/api/todos/search/${search}`)
      .then((response) => {
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Create New Todo
  const createTodo = async (event: FormEvent) => {
    event.preventDefault();
    if (title.length === 0) {
      toast.error("Please enter a title");
      return;
    }
    await axios
      .post(`http://localhost:3000/api/todos`, { title: title })
      .then((response) => {
        getAllTodos();
        setTitle("");
        toast.success(response.data.message);
      })
      .catch((error) => console.log(error.message));
  };

  // Toggle Todo Complete By ID
  const toggleComplete = async (id: string, complete: boolean) => {
    await axios
      .patch(`http://localhost:3000/api/todos/${id}`, { complete: !complete })
      .then((response) => {
        if (response.status === 200) {
          getAllTodos();
        }
      })
      .catch((error) => console.log(error.message));
  };

  // Update Todo By ID
  const updateTodo = async (id: string, title: string) => {
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputValue: title,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (updateTitle: string) => {
        return axios
          .patch(`http://localhost:3000/api/todos/${id}`, { title: updateTitle })
          .then((response) => {
            if (response.status === 200) {
              getAllTodos();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  // Delete Todo By ID
  const deleteTodo = async (id: string) => {
    await axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then((response) => {
        if (response.status === 200) {
          getAllTodos();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col flex-wrap mt-10">
      <Toaster />
      <h1 className="text-xl xl:text-[30px] font-bold mb-5 text-center">Full-Stack TodoLists</h1>
      <div className="w-fit flex justify-center">
        <FormInput title={title} setTitle={setTitle} createTodo={createTodo} />
      </div>
      <div>
        <ButtonsComponent
          handleSearchTodo={handleSearchTodo}
          setSearchTodo={setSearchTodo}
          getAllTodos={getAllTodos}
        />
      </div>
      <div className="flex flex-wrap flex-col mt-3">
        <p className="font-bold text-center">
          All Todos ({todos.length}) |
          {searchTodo === "all"
            ? "#All"
            : searchTodo === "complete"
            ? "#Complete"
            : "#Not Complete"}
        </p>
        {todos.map((todo) => {
          return (
            <TodoComponent
              key={todo._id}
              {...todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
            />
          );
        })}
      </div>
    </div>
  );
}
