"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div>
      <div className="flex">
        <div>
          <Input
            type="text"
            value={newUser.username}
            onChange={(e) => handleInput(e)}
            placeholder="Enter"
            name="username"
          />
        </div>
        <div>
          <Input
            type="text"
            value={newUser.email}
            onChange={(e) => handleInput(e)}
            placeholder="Enter"
            name="email"
          />
        </div>
        <div>
          <Input
            type="password"
            value={newUser.password}
            onChange={(e) => handleInput(e)}
            placeholder="Enter"
            name="password"
          />
        </div>
        <div>
          <Input
            type="text"
            value={newUser.bio}
            onChange={(e) => handleInput(e)}
            placeholder="Enter"
            name="bio"
          />
        </div>
        <div>
          <Button onClick={() => handleSignUp()}>Create User</Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
