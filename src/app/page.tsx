"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const user = localStorage.getItem("user");
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  const generatePost = () => {
    router.push("Generate-Post");
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <div>
        <Button onClick={generatePost}>Create Post</Button>
      </div>
    </div>
  );
}
