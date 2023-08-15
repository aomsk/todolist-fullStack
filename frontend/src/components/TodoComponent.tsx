import { ITodo } from "../utils/todoInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

type TodoProps = ITodo & {
  toggleComplete: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
};

function TodoComponent({
  _id,
  title,
  complete,
  deleteTodo,
  toggleComplete,
  updateTodo,
}: TodoProps) {
  return (
    <div className={complete ? "text-gray-400 rounded-lg line-through font-normal" : ""}>
      <div className="w-[300px] md:w-[450px] h-auto xl:w-[550px] flex justify-between items-center rounded-lg bg-gray-100 p-3 py-5 mt-3 mb-3 ">
        <p className="font-bold cursor-pointer" onClick={() => toggleComplete(_id, complete)}>
          {title}
        </p>
        <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#F1C40F", cursor: "pointer", marginRight: "10px" }}
            onClick={() => updateTodo(_id, title)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#E74C3C", cursor: "pointer" }}
            onClick={() => deleteTodo(_id)}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
