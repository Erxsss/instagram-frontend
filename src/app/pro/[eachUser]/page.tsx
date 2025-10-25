"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FooterIcon } from "../../_components/footer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, User } from "@/provider/AuthProvider";
import { toast } from "sonner";

type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: User;
};
const Page = () => {
  const [userS, setUser] = useState<User>();
  const { token, user } = useUser();
  const params = useParams();
  const [posts, setPosts] = useState<postType[]>([]);
  console.log(token);
  const userId = params.eachUser;
  const router = useRouter();
  const seePost = async () => {
    const res = await fetch(`http://localhost:5555/post/postUser/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/jsons",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const posts = await res.json();
      setPosts(posts);
    }
  };
  const seeProfile = async () => {
    const res = await fetch(`http://localhost:5555/user/pro/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/jsons",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      setUser(user);
    }
  };
  const followUser = async (followingUserId: string) => {
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
    } else {
      toast.error("Cant follow yourself");
    }
    seeProfile();
  };
  useEffect(() => {
    seeProfile();
    seePost();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col pt-[10px]">
      <div className="w-screen h-[5%] flex gap-[30px] ">
        <div className="flex w-[60%] justify-between">
          <div className="left-0" onClick={() => router.push("/")}>
            <ArrowLeft className="h-[100%] w-[100%]" />
          </div>
          <div className="text-[20px] m-[10px]">{userS?.username}</div>
        </div>
      </div>
      <div className="flex justify-around p-[10px] items-center w-[100%] h-[15%]">
        <div>
          <img
            src={userS?.profilePic || undefined}
            alt=""
            className="w-[100px] h-[100px] rounded-[100%] border-4"
          />
        </div>
        <div className="">
          <div className="flex justify-center">{posts.length}</div>
          <div className=" text-gray-600 ">Post</div>
        </div>
        <div>
          <div className="flex justify-center">{userS?.followers.length}</div>
          <div className=" text-gray-600 ">Followers</div>
        </div>
        <div>
          <div className="flex justify-center">{userS?.following.length}</div>
          <div className=" text-gray-600 ">Following</div>
        </div>
      </div>
      <div className="flex w-[100%] h-[10%] p-[10px] flex-col gap-[10px]">
        <div className="flex justify-center w-[35%]">{userS?.username}</div>
        <div className="flex w-[50%] h-[80%] text-[15px]">{userS?.bio}</div>
      </div>
      <div className="flex w-[100%] p-[10px] justify-around">
        <div className="w-[50%]">
          {userS?.followers.includes(user?._id || "") ? (
            <Button
              className="w-[90%] bg-gray-500"
              onClick={() => followUser(userS?._id)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className="w-[90%]"
              onClick={() => followUser(userS?._id || "")}
            >
              Follow
            </Button>
          )}
        </div>
        <div className="w-[50%]">
          <Button className="w-[90%]">Message</Button>
        </div>
      </div>
      <div className="flex w-screen flex-wrap rounded-2xl px-[5px] py-[4px] gap-[5px] pb-[70px]">
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <img
                src={post.images[0]}
                alt=""
                className="w-[130px] h-[170px] rounded-2xl"
                onClick={() => router.push(`/post/${post._id}`)}
              />
            </div>
          );
        })}
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
