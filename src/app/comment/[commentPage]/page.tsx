import { ChangeEvent, useState } from "react";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  return (
    <div className="w-screen h-screen">
      <div>
        <input type="text" onChange={(e) => handleInput(e)} />
      </div>
    </div>
  );
};
export default Page;
