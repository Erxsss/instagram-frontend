"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
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
    const res = await fetch(
      `https://ig-backend-p8fz.onrender.com/post/postUser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/jsons",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const posts = await res.json();
      setPosts(posts);
    }
  };
  const seeProfile = async () => {
    const res = await fetch(
      `https://ig-backend-p8fz.onrender.com/user/pro/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/jsons",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const user = await res.json();
      setUser(user);
    }
  };
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
    <div className="w-screen h-screen flex flex-col pt-[10px] relative gap-[10px]">
      <div>
        <div className="left-0" onClick={() => router.push("/")}>
          <ArrowLeft className="h-[30px] w-[30px]" />
        </div>
      </div>
      <div className="flex justify-center p-[10px] items-center h-[15%] gap-[60px] mt-[-10px]">
        <div className="flex m-[-20px]">
          <img
            src={userS?.profilePic || undefined}
            alt=""
            className="w-[100px] h-[100px] rounded-[100%] border-4 border-y-sky-400 border-x-pink-400"
          />
        </div>
        <div className="text-[30px] font-bold">{userS?.username}</div>
      </div>
      <div className="flex justify-evenly mt-[20px] text-[17px]">
        <div>
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
      <div className="flex justify-center  w-[100%] h-[10%] p-[5px] flex-col gap-[15px] flex-wrap">
        <div className="flex w-[100%] h-[80%] text-[18px] justify-center">
          {userS?.bio}
        </div>
      </div>
      <div className="flex w-[100%] p-[10px] justify-evenly">
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
      </div>
      <div className="w-[100%] flex justify-center">
        <div className="flex w-[90%] flex-wrap rounded-2xl px-[5px] py-[4px] gap-[10px] pb-[70px] overflow-scroll justify-center">
          {posts.map((post, index) => {
            return (
              <div key={index}>
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-[170px] h-[230px] rounded-2xl border-4 border-y-sky-400 border-x-pink-400"
                  onClick={() => router.push(`/post/${post._id}`)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
