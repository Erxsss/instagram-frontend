"use client";
import { Button } from "@/components/ui/button";
import { useUser, User } from "@/provider/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { footerIcon as FooterIcon } from "@/app/_components/footer";
import { toast } from "sonner";
import { ArrowLeft, Smile } from "lucide-react";
type comment = {
  _id: string;
  post: string;
  comment: string;
  user: User;
};
const Page = () => {
  const { token } = useUser();
  const router = useRouter();
  const [comments, setComments] = useState<comment[]>([]);
  const [input, setInput] = useState<string>("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const params = useParams();
  const post = params.commentPage;
  console.log(post);
  const seeCom = async () => {
    const res = await fetch(`http://localhost:5555/comment/get/${post}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      const comments = await res.json();
      setComments(comments);
    }
  };
  useEffect(() => {
    if (token) seeCom();
  }, [token]);
  const createCom = async () => {
    const res = await fetch("http://localhost:5555/comment/commentCreate", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        postId: post,
        comment: input,
      }),
    });
    if (res.ok) {
      toast.success("Succesfully Commented");
    }
    seeCom();
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-[60%] h-[7%] flex items-center justify-between">
        <ArrowLeft
          className="w-[40px] h-[40px]"
          onClick={() => router.push("/")}
        />
        <div className="text-[20px]">Comments</div>
      </div>
      <div className="flex flex-col gap-[20px] w-screen h-[80%] p-[10px] overflow-scroll">
        {comments.map((com) => {
          return (
            <div key={com._id} className="gap-[5px]">
              <div className="flex gap-[10px] items-center">
                <img
                  src={com.user.profilePic}
                  alt=""
                  className="w-[45px] h-[45px] rounded-[100%]"
                />
                <h1 className="font-bold">{com.user.username}</h1>
              </div>
              <div className="text-[20px]">{com.comment}</div>
            </div>
          );
        })}
      </div>
      <div className="bottom-0 w-screen h-[20%] border-2  mb-[70px] flex p-[5px] justify-around">
        <div className="flex justify-center items-center">
          <Smile />
        </div>
        <div className="w-[60%] h-[100%]">
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            value={input}
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="w-[20%] flex justify-center items-center">
          <div
            onClick={() => createCom()}
            className="bg-white text-sky-500 text-[15px] "
          >
            Comment
          </div>
        </div>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
