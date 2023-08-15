import { FormEvent, useRef, useEffect } from "react";
type Props = {
  title: string;
  setTitle: (title: string) => void;
  createTodo: (event: FormEvent) => void;
};

function FormInput({ title, setTitle, createTodo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fogus input
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={createTodo}>
      <input
        type="text"
        name=""
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-[200px] md:w-[300px] xl:w-[400px] border-2 border-solid border-black rounded-lg p-1 mr-1"
      />
      <button
        type="submit"
        id="btn-add-new"
        className="border-2 border-solid border-black rounded-lg bg-black text-white px-5 py-1.5 mr-1"
      >
        Add Todo
      </button>
    </form>
  );
}

export default FormInput;
