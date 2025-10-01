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
            <div
              key={index}
              className="w-[100%] h-[739px] flex flex-col gap-[10px]"
            >
              <div className="flex items-center gap-[15px]">
                <div>
                  <img
                    src={user?.profilePic}
                    alt=""
                    className="w-[42px] h-[42px] rounded-4xl"
                  />
                </div>
                <div>
                  <h2>{user?.username}</h2>
                </div>
              </div>
              <div className="h-[523px]">
                <img src={post.images[0]} alt="" className="h-[100%]" />
              </div>
              <div>
                <h1>{post.caption}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
