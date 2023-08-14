import { Todo } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

type TodoProps = Todo & {
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number) => void;
};

function TodoComponent({ id, todo, complete, toggleComplete, deleteTodo, updateTodo }: TodoProps) {
  return (
    <div
      className={complete ? "text-gray-400 rounded-lg line-through font-normal" : ""}
      onClick={() => toggleComplete(id)}
    >
      <div className="w-[300px] md:w-[450px] h-auto xl:w-[550px] flex justify-between items-center rounded-lg bg-gray-100 p-3 py-5 mt-3 mb-3 ">
        <p className="font-bold">{todo}</p>
        <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#F1C40F", cursor: "pointer", marginRight: "10px" }}
            onClick={() => updateTodo(id)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#E74C3C", cursor: "pointer" }}
            onClick={() => deleteTodo(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
