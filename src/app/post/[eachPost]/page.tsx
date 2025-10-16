"use client";
import { useUser, User } from "@/provider/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { headerIcon as HeaderIcon } from "@/app/_components/HeaderIcon";
import { footerIcon as FooterIcon } from "@/app/_components/footer";
import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: User;
};
const Page = () => {
  const params = useParams();
  const { token, user } = useUser();
  const router = useRouter();
  const [post, setPost] = useState<postType>();
  const myId = user?._id;
  const postId = params.eachPost;
  const findPost = async () => {
    const res = await fetch(`http://localhost:5555/post/userPost/${postId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const post = await res.json();
      setPost(post);
    }
  };

  useEffect(() => {
    if (token) findPost();
  }, [token]);
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
    <div className="w-[100%] h-[739px] flex flex-col gap-[10px]">
      <HeaderIcon />
      <div className="flex items-center gap-[15px]">
        <div>
          <img
            src={post?.userId?.profilePic}
            alt=""
            className="w-[42px] h-[42px] rounded-4xl"
            onClick={() => router.push(`/pro/${post?.userId._id}`)}
          />
        </div>
        <div>
          <h2 onClick={() => router.push(`/pro/${post?.userId._id}`)}>
            {post?.userId?.username}
          </h2>
        </div>
        <div>
          {post?.userId.followers.includes(myId) ? (
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
        <img src={post?.images[0]} alt="" className="h-[100%]" />
      </div>
      <div className="flex gap-[10px] mx-[10px]">
        <div className="text-[17px] font-bold">{post?.like.length}</div>
        <div onClick={() => toggleLike(post._id)}>
          {myId && post?.like.includes(myId) ? (
            <Heart fill="red" color="red" />
          ) : (
            <Heart />
          )}
        </div>
        <MessageCircle className="w-[20px] h-[20px]" />
      </div>
      <div className="p-[10px]">
        <h1 className="text-[20px]">{post?.caption}</h1>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
