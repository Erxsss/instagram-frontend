"use client";
import { useUser, user } from "@/provider/AuthProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: user;
};
const Page = () => {
  const params = useParams();
  const { token } = useUser();
  const [post, setPost] = useState<postType>("");
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
  findPost();
  useEffect(() => {
    if (token) findPost();
  }, [token]);
  return <div>{post.caption}</div>;
};
export default Page;
