"use client";
import { useUser, User } from "@/provider/AuthProvider";
import { footerIcon as FooterIcon } from "../_components/footer";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: User;
};
const Page = () => {
  const { user, token, setUser } = useUser();
  const [input, setInput] = useState({
    bio: `${user?.bio}`,
    email: `${user?.email}`,
    profilePic: `${user?.profilePic}`,
    username: `${user?.username}`,
  });
  const [posts, setPosts] = useState<postType[]>([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
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
  const editUser = async () => {
    const res = await fetch(`http://localhost:5555/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio: input.bio,
        email: input.email,
        profilePic: input.profilePic,
        username: input.username,
      }),
    });
  };
  const showEdit = () => {
    setShow(true);
  };
  useEffect(() => {
    findUser();
  }, []);
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "bio") {
      setInput((prev) => {
        return { ...prev, bio: value };
      });
    }
    if (name === "username") {
      setInput((prev) => {
        return { ...prev, username: value };
      });
    }
    if (name === "profile") {
      setInput((prev) => {
        return { ...prev, profilePic: value };
      });
    }
    if (name === "email") {
      setInput((prev) => {
        return { ...prev, email: value };
      });
    }
  };
  console.log(input);
  return (
    <div className="w-screen h-screen flex flex-col pt-[10px] relative">
      {show && (
        <div className="w-[100%] h-[100%] flex justify-center items-center absolute">
          <div className="w-[80%] h-[70%] z-50  border-6 rounded-4xl m-[5px] p-[50px] edit border-black gap-[10px]">
            <div>
              <h1 className="text-[30px]">Enter Bio</h1>
              <textarea
                name="bio"
                id=""
                className="border-4 rounded-2xl border-black"
                onChange={(e) => handleInput(e)}
                value={input.bio}
              ></textarea>
            </div>
            <div>
              <h1 className="text-[30px]">Enter Username</h1>
              <textarea
                name="username"
                id=""
                className="border-4 rounded-2xl border-black"
                onChange={(e) => handleInput(e)}
                value={input.username}
              ></textarea>
            </div>
            <div>
              <h1 className="text-[30px]">Enter Email</h1>
              <textarea
                name="email"
                id=""
                className="border-4 rounded-2xl border-black"
                onChange={(e) => handleInput(e)}
                value={input.email}
              ></textarea>
            </div>
            <div>
              <h1 className="text-[27px]">Enter ProfilePicture</h1>
              <textarea
                name="profile"
                id=""
                className="border-4 rounded-2xl border-black"
                onChange={(e) => handleInput(e)}
                value={input.profilePic}
              ></textarea>
            </div>
            <Button
              className="w-[180px] h-[40px] mt-[10px]"
              onClick={() => editUser()}
            >
              Edit Profile
            </Button>
            <Button
              className="w-[180px] h-[40px] mt-[10px]"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="w-screen h-[5%] flex gap-[30px] ">
        <div className="flex w-[60%] justify-between">
          <div className="left-0" onClick={() => router.push("/")}>
            <ArrowLeft className="h-[100%] w-[100%]" />
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
          <div className="flex justify-center">{posts.length}</div>
          <div className=" text-gray-600 ">Post</div>
        </div>
        <div>
          <div className="flex justify-center">{user?.followers.length}</div>
          <div className=" text-gray-600 ">Followers</div>
        </div>
        <div>
          <div className="flex justify-center">{user?.following.length}</div>
          <div className=" text-gray-600 ">Following</div>
        </div>
      </div>
      <div className="flex w-[100%] h-[10%] p-[10px] flex-col gap-[10px]">
        <div className="flex justify-center w-[35%]">{user?.username}</div>
        <div className="flex w-[50%] h-[80%] text-[10px]">{user?.bio}</div>
      </div>
      <div className="flex w-[100%] p-[10px] justify-around">
        <div className="w-[50%]">
          <Button className="w-[90%] bg-sky-600" onClick={() => showEdit()}>
            Edit Profile
          </Button>
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
                src={post.images}
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
