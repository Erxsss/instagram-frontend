"use client";
import { Button } from "@/components/ui/button";
import { useUser, user } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { headerIcon as HeaderIcon } from "./_components/HeaderIcon";
import { footerIcon as FooterIcon } from "./_components/footer";
import { Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: user;
};
export default function Home() {
  const { user, token } = useUser();
  const router = useRouter();
  const [posts, setPost] = useState<postType[]>([]);
  const myId: string | undefined = user?._id;
  const findPost = async () => {
    const response = await fetch("http://localhost:5555/post/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    setPost(res);
  };
  useEffect(() => {
    findPost();
  }, []);
  const toggleLike = async (userId: string) => {
    const res = await fetch(`http://localhost:5555/post/postLike/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      await findPost();
    } else {
      toast.error("Like avlaa");
    }
  };
  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  const followUser = async (followingUserId: string) => {
    console.log(followingUserId);
    console.log(token);
    const res = await fetch(
      `http://localhost:5555/user/followToggle/${followingUserId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      toast.success("Followed");
      findPost();
    } else {
      toast.error("Cant follow yourself");
    }
  };
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
                    onClick={() => router.push(`pro/${post.userId._id}`)}
                  />
                </div>
                <div>
                  <h2 onClick={() => router.push(`pro/${post.userId._id}`)}>
                    {post.userId?.username}
                  </h2>
                </div>
                <div>
                  {post.userId.followers.includes(myId) ? (
                    <Button
                      onClick={() => {
                        followUser(post.userId._id);
                      }}
                      className="bg-gray-400"
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        followUser(post.userId._id);
                      }}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </div>
              <div className="h-[523px]">
                <img src={post.images[0]} alt="" className="h-[100%]" />
              </div>
              <div className="flex gap-[10px] mx-[10px]">
                <div className="text-[17px] font-bold">{post.like.length}</div>
                <div onClick={() => toggleLike(post._id)}>
                  {myId && post.like.includes(myId) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                </div>
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
