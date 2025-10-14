"use client";
import { useRouter } from "next/navigation";

export const headerIcon = () => {
  const router = useRouter();
  return (
    <img
      src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png"
      alt=""
      className="w-[150px] p-[10px]"
      onClick={() => router.push("/")}
    />
  );
};
