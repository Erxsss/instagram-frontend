"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Home() {
  const { user, token } = useUser();
  const router = useRouter();
  const [posts, setPost] = useState([]);
  const findPost = async () => {
    const response = await fetch("http://localhost:5555/post/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    setPost(res);
  };
  useEffect(() => {
    findPost();
  }, []);

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const generatePost = () => {
    router.push("Generate-Post");
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <div>
        <Button onClick={generatePost}>Create Post</Button>
      </div>
      <div>
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <img src={post.images[0]} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
