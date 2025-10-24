"use client";
import { CircleFadingPlus, CircleUser, House, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const footerIcon = () => {
  const router = useRouter();
  return (
    <div className="flex fixed bottom-0 w-screen h-[7%] bg-white justify-around items-center bar ">
      <House className="w-[30px] h-[30px]" onClick={() => router.push("/")} />
      <Search
        className="w-[30px] h-[30px]"
        onClick={() => router.push("/Search")}
      />
      <CircleFadingPlus
        className="w-[30px] h-[30px]"
        onClick={() => router.push("/Generate-Post")}
      />
      <CircleUser
        className="w-[30px] h-[30px]"
        onClick={() => router.push("/profile")}
      />
    </div>
  );
};
