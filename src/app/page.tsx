"use client";
import { Button } from "@/components/ui/button";
import { useUser, User } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { headerIcon as HeaderIcon } from "./_components/HeaderIcon";
import { footerIcon as FooterIcon } from "./_components/footer";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: User;
};
export default function Home() {
  const { user, token, myBigId } = useUser();
  const router = useRouter();
  const [posts, setPost] = useState<postType[]>([]);
  const myId = user?._id;
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
    }
  };
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    findPost();
  }, []);
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
      findPost();
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-[10px]">
      <div className="fixed top-0 bg-white w-screen">
        <HeaderIcon />
      </div>
      <div className="w-[100%] h-[100%] mt-[60px] mb-[30px] overflow-scroll p-[5px]">
        {posts.map((post, index) => {
          return (
            <div
              key={index}
              className="w-[100%] h-[720px] flex flex-col gap-[10px]"
            >
              <div className="flex items-center gap-[15px]">
                <div>
                  <Avatar className="w-[42px] h-[42px] rounded-4xl">
                    <AvatarImage
                      src={post.userId?.profilePic || undefined}
                      onClick={() => router.push(`/pro/${post.userId._id}`)}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h2 onClick={() => router.push(`/pro/${post.userId._id}`)}>
                    {post.userId?.username}
                  </h2>
                </div>
                <div>
                  {post.userId._id === myBigId ? (
                    <div></div>
                  ) : post.userId.followers.includes(myId || "") ? (
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
              {post.images.length > 1 ? (
                <Carousel>
                  <CarouselContent>
                    {post.images.map((img) => {
                      return (
                        <CarouselItem className="p-1" key={img}>
                          <div>
                            <div>
                              <img
                                src={img}
                                alt=""
                                className="h-[523px] w-screen"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="ml-[52px]" />
                  <CarouselNext className="mr-[52px]" />
                </Carousel>
              ) : (
                <div>
                  <img
                    src={post.images[0]}
                    alt=""
                    className="h-[523px] w-screen"
                  />
                </div>
              )}
              <div className="flex gap-[10px] mx-[10px]">
                <div className="text-[17px] font-bold">{post.like.length}</div>
                <div onClick={() => toggleLike(post._id)}>
                  {myId && post.like.includes(myId) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                </div>
                <MessageCircle
                  className="w-[20px] h-[20px]"
                  onClick={() => router.push(`comment/${post._id}`)}
                />
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
