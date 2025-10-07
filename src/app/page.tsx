"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { headerIcon as HeaderIcon } from "./_components/HeaderIcon";
import { footerIcon as FooterIcon } from "./_components/footer";
import { Heart, MessageCircle } from "lucide-react";
export default function Home() {
  const { user, token } = useUser();
  const router = useRouter();
  const [posts, setPost] = useState([]);
  const findPost = async () => {
    const response = await fetch("http://localhost:5555/post/posts", {
      method: "GET",
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

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="fixed top-0 bg-white w-screen">
        <HeaderIcon />
      </div>
      <div className="w-[100%] h-[80%] mt-[70px]">
        {posts.map((post, index) => {
          return (
            <div
              key={index}
              className="w-[100%] h-[739px] flex flex-col gap-[10px]"
            >
              <div className="flex items-center gap-[15px]">
                <div>
                  <img
                    src={post.userId?.profilePic}
                    alt=""
                    className="w-[42px] h-[42px] rounded-4xl"
                  />
                </div>
                <div>
                  <h2>{post.userId?.username}</h2>
                </div>
              </div>
              <div className="h-[523px]">
                <img src={post.images[0]} alt="" className="h-[100%]" />
              </div>
              <div className="flex gap-[10px] mx-[10px]">
                <Heart className="w-[23px] h-[23px]" />
                <MessageCircle className="w-[20px] h-[20px]" />
              </div>
              <div className="p-[10px]">
                <h1 className="text-[20px]">{post.caption}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0">
        <FooterIcon />
      </div>
    </div>
  );
}
