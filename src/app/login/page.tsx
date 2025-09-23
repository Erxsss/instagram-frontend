"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";
import { Toaster, toast } from "sonner";
type userType = {
  email: string;
  password: string;
};
const Page = () => {
  const router = useRouter();
  const { login, user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState<userType>({
    email: "",
    password: "",
  });
  const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setUserInfo((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setUserInfo((prev) => {
        return { ...prev, password: value };
      });
    }
  };
  const handleLogIn = async () => {
    console.log(userInfo.email);
    await login(userInfo.email, userInfo.password);
    router.push("/");
  };
  return (
    <div className="flex w-[100vw] h-[100vh] flex-col">
      <div className="flex ">
        <div></div>
        <div>
          <div>
            <Input
              placeholder="Enter your email"
              name="email"
              value={userInfo.email}
              onChange={(e) => setInputValue(e)}
            />
          </div>
          <div>
            <Input
              placeholder="Enter your password"
              name="password"
              value={userInfo.password}
              onChange={(e) => setInputValue(e)}
            />
          </div>
          <div>
            <Toaster />
            <Button onClick={handleLogIn}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
