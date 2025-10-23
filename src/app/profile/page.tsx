"use client";
import { useUser, User } from "@/provider/AuthProvider";
import { footerIcon as FooterIcon } from "../_components/footer";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: User;
};
const Page = () => {
  const { user, myBigId, token, setUser, setToken } = useUser();
  const [userr, setUserr] = useState<User>();
  const [posts, setPosts] = useState<postType[]>([]);
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
  const [input, setInput] = useState({
    bio: `${user?.bio}`,
    email: `${user?.email}`,
    profilePic: `${user?.profilePic}`,
    username: `${user?.username}`,
  });
  const findUserPro = async () => {
    const response = await fetch(`http://localhost:5555/user/pro/${myBigId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const usr = await response.json();
    setUserr(usr);
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
    const editedUser = await res.json();
    console.log(editedUser);
    setUser(editedUser);
    setUserr(editedUser);
  };
  console.log(input);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("login");
  };
  useEffect(() => {
    if (token) findUser();
    if (token) findUserPro();
  }, [token]);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (name === "profilePic") {
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
      <div className="w-screen h-[5%] flex gap-[30px] ">
        <div className="flex w-[60%] justify-between">
          <div className="left-0" onClick={() => router.push("/")}>
            <ArrowLeft className="h-[100%] w-[100%]" />
          </div>
          <div className="text-[20px] m-[10px]">{userr?.username}</div>
        </div>
      </div>
      <div className="flex justify-around p-[10px] items-center w-[100%] h-[15%]">
        <div>
          <img
            src={userr?.profilePic || undefined}
            alt=""
            className="w-[100px] h-[100px] rounded-[100%] border-4"
          />
        </div>
        <div className="">
          <div className="flex justify-center">{posts.length}</div>
          <div className=" text-gray-600 ">Post</div>
        </div>
        <div>
          <div className="flex justify-center">{userr?.followers.length}</div>
          <div className=" text-gray-600 ">Followers</div>
        </div>
        <div>
          <div className="flex justify-center">{userr?.following.length}</div>
          <div className=" text-gray-600 ">Following</div>
        </div>
      </div>
      <div className="flex w-[100%] h-[10%] p-[5px] flex-col gap-[15px]">
        <div className="flex justify-center w-[35%]">{userr?.username}</div>
        <div className="flex w-[50%] h-[80%] text-[15px]">{userr?.bio}</div>
      </div>
      <div className="flex w-[100%] p-[10px] justify-around">
        <div className="w-[50%]">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-[200px]">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Bio</Label>
                    <Input
                      id="name-1"
                      name="bio"
                      defaultValue={input.bio}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input
                      id="username-1"
                      name="username"
                      defaultValue={input.username}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Email</Label>
                    <Input
                      id="username-1"
                      name="username"
                      defaultValue={input.email}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Profile Picture</Label>
                    <Input
                      id="username-1"
                      name="profilePic"
                      defaultValue={input.profilePic}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" onClick={() => editUser()}>
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className="w-[50%]">
          <Button className="w-[90%]" onClick={() => logOut()}>
            Log Out
          </Button>
        </div>
      </div>
      <div className="flex w-screen flex-wrap rounded-2xl px-[5px] py-[4px] gap-[5px] pb-[70px] overflow-scroll">
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

// Fall@2024!
