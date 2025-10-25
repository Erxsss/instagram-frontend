"use client";
import { useRouter } from "next/navigation";

export const HeaderIcon = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-[60px] bar top-0">
      <img
        src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png"
        alt=""
        className="w-[150px] p-[10px]"
        onClick={() => router.push("/")}
      />
    </div>
  );
};
