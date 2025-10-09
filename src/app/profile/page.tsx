"use client";
import { useUser } from "@/provider/AuthProvider";
import { footerIcon as FooterIcon } from "../_components/footer";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const Page = () => {
  const { user, token } = useUser();
  const [posts, setPosts] = useState([]);
  const findUser = async () => {
    const response = await fetch("http://localhost:5555/post/userPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    setPosts(res);
  };
  useEffect(() => {
    findUser();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col pt-[10px]">
      <div className="w-screen h-[5%] flex gap-[30px] ">
        <div className="flex w-[60%] justify-between">
          <div className="left-0">
            <ArrowBigLeft className="h-[100%] w-[100%]" />
          </div>
          <div className="text-[20px] m-[10px]">{user?.username}</div>
        </div>
      </div>
      <div className="flex justify-around p-[10px] items-center w-[100%] h-[15%]">
        <div>
          <img
            src={user?.profilePic}
            alt=""
            className="w-[100px] h-[100px] rounded-[100%] border-4"
          />
        </div>
        <div className="">
          <div className="flex justify-center">1234</div>
          <div className=" text-gray-600 ">Post</div>
        </div>
        <div>
          <div className="flex justify-center">1234</div>
          <div className=" text-gray-600 ">Followers</div>
        </div>
        <div>
          <div className="flex justify-center">1234</div>
          <div className=" text-gray-600 ">Following</div>
        </div>
      </div>
      <div className="flex w-[100%] h-[10%] p-[10px] flex-col gap-[10px]">
        <div className="flex justify-center w-[35%]">{user?.username}</div>
        <div className="flex w-[50%] h-[80%] text-[10px]">{user?.bio}</div>
      </div>
      <div className="flex w-[100%] p-[10px] justify-around">
        <div className="w-[50%]">
          <Button className="w-[90%]">Follow</Button>
        </div>
        <div className="w-[50%]">
          <Button className="w-[90%]">Message</Button>
        </div>
      </div>
      <div className="flex w-screen flex-wrap rounded-2xl px-[5px] py-[4px] gap-[5px]">
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <img
                src={post.images}
                alt=""
                className="w-[130px] h-[170px] rounded-2xl"
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
