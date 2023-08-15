type ButtonProps = {
  // search: string;
  setSearchTodo: (searchTodo: string) => void;
  handleSearchTodo: (search: string) => void;
  getAllTodos: () => void;
};

function ButtonsComponent({ setSearchTodo, handleSearchTodo, getAllTodos }: ButtonProps) {
  return (
    <div className="w-[200px] md:w-[400px] xl:w-[490px] flex mt-2 justify-center">
      <button
        type="button"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => {
          setSearchTodo("complete");
          handleSearchTodo("complete");
        }}
      >
        Complete
      </button>
      <button
        type="button"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => {
          setSearchTodo("notcomplete");
          handleSearchTodo("notcomplete");
        }}
      >
        Not Complete
      </button>
      <button
        type="button"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => {
          setSearchTodo("all");
          getAllTodos();
        }}
      >
        All
      </button>
    </div>
  );
}

export default ButtonsComponent;
