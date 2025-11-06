"use client";
import { Button } from "@/components/ui/button";
import { useUser, User } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderIcon } from "./_components/HeaderIcon";
import { FooterIcon } from "./_components/footer";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";

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
  const [likeAnimating, setLikeAnimating] = useState<string | null>(null);
  const myId = user?._id;

  const findPost = async () => {
    const response = await fetch(
      "https://ig-backend-p8fz.onrender.com/post/posts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    setPost(res);
  };

  const toggleLike = async (postId: string) => {
    setLikeAnimating(postId);
    setTimeout(() => setLikeAnimating(null), 500);

    const res = await fetch(
      `https://ig-backend-p8fz.onrender.com/post/postLike/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) await findPost();
  };

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  useEffect(() => {
    if (user) findPost();
  }, [user]);

  const followUser = async (followingUserId: string) => {
    const res = await fetch(
      `https://ig-backend-p8fz.onrender.com/user/followToggle/${followingUserId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) findPost();
  };

  if (!posts) return <div className="mt-[800px]">Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 text-gray-900 bod">
      <div className="fixed top-0 z-50  backdrop-blur-md w-full">
        <HeaderIcon />
      </div>

      <div className="mt-[70px] mb-[70px] overflow-y-scroll flex flex-col gap-6 px-3 pb-10">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar
                className="w-11 h-11 ring-2 ring-gray-100 cursor-pointer"
                onClick={() => router.push(`/pro/${post.userId._id}`)}
              >
                <AvatarImage src={post.userId?.profilePic || undefined} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div
                onClick={() => router.push(`/pro/${post.userId._id}`)}
                className="font-semibold text-[15px] cursor-pointer hover:underline"
              >
                {post.userId?.username}
              </div>
              <div className="ml-auto">
                {post?.userId?._id ===
                myBigId ? null : post?.userId?.followers.includes(
                    myId || ""
                  ) ? (
                  <Button
                    onClick={() => followUser(post.userId._id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 h-8 text-sm"
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    onClick={() => followUser(post.userId._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 h-8 text-sm"
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden">
              {post.images.length > 1 ? (
                <Carousel>
                  <CarouselContent>
                    {post.images.map((img) => (
                      <CarouselItem key={img}>
                        <img
                          src={img}
                          alt=""
                          className="object-cover w-full max-h-[520px] rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-[70px]" />
                  <CarouselNext className="mr-[70px]" />
                </Carousel>
              ) : (
                <img
                  src={post.images[0]}
                  alt=""
                  className="object-cover w-full max-h-[520px] rounded-lg"
                />
              )}
            </div>

            <div className="flex items-center gap-4 mt-3 text-gray-700">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-[15px]">
                  {post.like.length}
                </div>

                <div
                  className="relative cursor-pointer"
                  onClick={() => toggleLike(post._id)}
                >
                  <AnimatePresence>
                    {likeAnimating === post._id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute -top-3 -left-3 text-red-500"
                      >
                        <Heart fill="red" color="red" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {myId && post.like.includes(myId) ? (
                      <Heart fill="red" color="red" />
                    ) : (
                      <Heart />
                    )}
                  </motion.div>
                </div>
              </div>

              <MessageCircle
                className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => router.push(`comment/${post._id}`)}
              />
            </div>

            <div className="mt-3 text-[16px] leading-snug break-words">
              {post.caption}
            </div>
          </div>
        ))}
      </div>

      <FooterIcon />
    </div>
  );
}
