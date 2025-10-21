"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/provider/AuthProvider";
import { Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Toaster } from "sonner";

type userType = {
  email: string;
  password: string;
};
const Page = () => {
  const router = useRouter();
  const { login, token } = useUser();
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

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className="flex w-[100vw] h-[100vh] flex-col">
      <div className="flex justify-center w-[100%] h-[100%] items-center flex-col">
        <div className="flex flex-col h-[70%] gap-[30px] mt-[200px]">
          <div className="flex justify-center">
            <Instagram className="w-[70px] h-[70px]" />
          </div>
          <div className="flex gap-[10px] flex-col">
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
                type="password"
                placeholder="Enter your password"
                name="password"
                value={userInfo.password}
                onChange={(e) => setInputValue(e)}
              />
            </div>
            <div className="flex justify-center">
              <Toaster />
              <Button onClick={handleLogIn} className="w-[100%]">
                Login
              </Button>
            </div>
          </div>
          <div className="flex gap-[5px]">
            <h1 className="text-[20px] font-bold">Dont have account?</h1>
            <a href="signup" className="text-[20px] font-bold text-sky-600">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
