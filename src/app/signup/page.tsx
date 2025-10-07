"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Instagram } from "lucide-react";
type userType = {
  username: string;
  email: string;
  password: string;
  bio: string;
};
const Page = () => {
  const { signup } = useUser();
  const router = useRouter();
  const [newUser, setNewUser] = useState<userType>({
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "username") {
      setNewUser((prev) => {
        return { ...prev, username: value };
      });
    }
    if (name === "email") {
      setNewUser((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setNewUser((prev) => {
        return { ...prev, password: value };
      });
    }
    if (name === "bio") {
      setNewUser((prev) => {
        return { ...prev, bio: value };
      });
    }
  };
  console.log(newUser);
  const handleSignUp = async () => {
    console.log("jio");
    await signup(
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.bio
    );
    router.push("/");
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="flex w-[100%] h-[70%] flex-col justify-center items-center gap-[10px] pt-[200px]">
        <div>
          <Instagram className="w-[70px] h-[70px] mb-[20px]" />
        </div>
        <div>
          <Input
            type="text"
            value={newUser.username}
            onChange={(e) => handleInput(e)}
            placeholder="Enter your username"
            name="username"
          />
        </div>
        <div>
          <Input
            type="text"
            value={newUser.email}
            onChange={(e) => handleInput(e)}
            placeholder="Enter your email"
            name="email"
          />
        </div>
        <div>
          <Input
            type="password"
            value={newUser.password}
            onChange={(e) => handleInput(e)}
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div>
          <Input
            type="text"
            value={newUser.bio}
            onChange={(e) => handleInput(e)}
            placeholder="Enter your bio"
            name="bio"
          />
        </div>
        <div className="w-[200px]">
          <Button onClick={() => handleSignUp()} className="w-[100%]">
            Create User
          </Button>
        </div>
        <div className="flex gap-[5px]">
          <h1 className="text-[20px] font-bold">Have an account?</h1>
          <a href="login" className="text-[20px] font-bold text-sky-500">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};
export default Page;
