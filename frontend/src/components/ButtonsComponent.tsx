type ButtonProps = {
  setBtnAll: (btnAll: boolean) => void;
  setComplete: (complete: boolean) => void;
};

function ButtonsComponent({ setBtnAll, setComplete }: ButtonProps) {
  return (
    <div className="w-[200px] md:w-[400px] xl:w-[490px] flex mt-2 justify-center">
      <button
        type="submit"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => {
          setComplete(true);
          setBtnAll(false);
        }}
      >
        Complete
      </button>
      <button
        type="submit"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => {
          setComplete(false);
          setBtnAll(false);
        }}
      >
        Not Complete
      </button>
      <button
        type="submit"
        className="font-bold border-b-2 border-solid border-black px-5 py-2 mr-2 mb-2 active:border-dashed"
        onClick={() => setBtnAll(true)}
      >
        All
      </button>
    </div>
  );
}

export default ButtonsComponent;
