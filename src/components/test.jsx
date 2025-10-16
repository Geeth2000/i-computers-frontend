import { useState } from "react";

export default function Test() {
  const [count, setcount] = useState(0);

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center ">
        <button
          className="w-[100px] h-[40px] bg-red-500 text-white"
          onClick={() => {
            setcount(count - 1);
          }}
        >
          Decrement
        </button>
        <h1 className="w-[100px] h-[40px] text-2xl text-center">{count}</h1>
        <button
          className="w-[100px] h-[40px] bg-green-500 text-white"
          onClick={() => {
            setcount(count + 1);
          }}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
