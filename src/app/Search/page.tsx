"use client";
import { ArrowLeft, SearchCheck } from "lucide-react";
import { footerIcon as FooterIcon } from "../_components/footer";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser, user } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
const Search = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const router = useRouter();
  const { token } = useUser();
  const find = async () => {
    const res = await fetch(`http://localhost:5555/user/users/${input}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const users = await res.json();
      setUsers(users);
    }
  };
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  useEffect(() => {
    find();
  }, [input]);
  console.log(users);
  return (
    <div className="w-screen h-screen flex flex-col">
      {" "}
      <div className="flex w-screen h-[60px] p-[10px] items-center justify-around">
        {" "}
        <div>
          {" "}
          <ArrowLeft />{" "}
        </div>{" "}
        <div className="bg-gray-200 flex rounded-[10px] h-[100%] px-[20px] items-center gap-[15px]">
          {" "}
          <SearchCheck color="gray" />{" "}
          <input
            type="text"
            className="h-[30px] w-[170px] rounded-[10px]"
            placeholder="Enter Username"
            value={input}
            onChange={(e) => handleInputValue(e)}
          />{" "}
        </div>{" "}
        <div>Cancel</div>{" "}
      </div>{" "}
      <div className="flex gap-[10px]">
        {" "}
        {users.map((user) => {
          return (
            <div
              key={user._id}
              className="flex  w-[100%] justify-evenly items-center"
            >
              {" "}
              <div className="w-[60px] h-[60px] ">
                {" "}
                <img
                  src={user.profilePic}
                  alt=""
                  className="rounded-[100%]"
                  onClick={() => router.push(`/pro/${user._id}`)}
                />{" "}
              </div>{" "}
              <div
                className="font-bold text-[30px]"
                onClick={() => router.push(`/pro/${user._id}`)}
              >
                {" "}
                {user.username}{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
      <FooterIcon />{" "}
    </div>
  );
};
export default Search;
