"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { footerIcon as FooterIcon } from "../../_components/footer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/provider/AuthProvider";
type postType = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  userId: user;
};
type user = {
  _id: string;
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePic: string | null;
  following: string[];
  followers: string[];
};
const Page = () => {
  const [user, setUser] = useState<user | undefined>();
  const [posts, setPosts] = useState<postType[] | null>([]);
  const router = useRouter();
  const { token } = useUser();
  const params = useParams();
  console.log(token);
  const userId = params.eachUser;
  // const router = useRouter();
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
  const seePosts = async () => {
    const res = await fetch(`http://localhost:5555/post/pro/${userId}`, {
      method: "POST",
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
  useEffect(() => {
    if (token) seeProfile();
    if (token) seePosts();
  }, [token]);

  console.log(user);

  return (
    <div className="w-screen h-screen flex flex-col pt-[10px]">
      <div className="w-screen h-[5%] flex gap-[30px] ">
        <div className="flex w-[60%] justify-between">
          <div className="left-0" onClick={() => router.push("/")}>
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
          <Button className="w-[90%]">Follow</Button>
        </div>
        <div className="w-[50%]">
          <Button className="w-[90%]">Message</Button>
        </div>
      </div>
      <div className="flex w-screen flex-wrap rounded-2xl px-[5px] py-[4px] gap-[5px]">
        {posts.map((post) => {
          return (
            <div key={post._id}>
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
