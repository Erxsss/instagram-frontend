"use client";
import { Button } from "@/components/ui/button";
import { useUser, User } from "@/provider/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FooterIcon } from "@/app/_components/footer";
import { toast } from "sonner";
import { ArrowLeft, Smile, Trash } from "lucide-react";
type comment = {
  _id: string;
  post: string;
  comment: string;
  user: User;
  createdAt: string;
};
const Page = () => {
  const { token, user } = useUser();
  const router = useRouter();
  const [comments, setComments] = useState<comment[]>([]);
  const [input, setInput] = useState<string>("");
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const params = useParams();
  const post = params.commentPage;
  console.log(post);
  const seeCom = async () => {
    const res = await fetch(
      `https://ig-backend-p8fz.onrender.com/comment/get/${post}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const coms = await res.json();
      setComments(coms);
    }
  };
  const deleteCom = async (comId: string) => {
    console.log(comId, "joooo");
    await fetch(
      `https://ig-backend-p8fz.onrender.com/comment/deleteCom/${comId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    seeCom();
  };
  useEffect(() => {
    if (token) seeCom();
  }, [token]);
  const createCom = async () => {
    const res = await fetch(
      "https://ig-backend-p8fz.onrender.com/comment/commentCreate",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post,
          comment: input,
        }),
      }
    );
    if (res.ok) {
      toast.success("Succesfully Commented");
    }
    seeCom();
    setInput("");
  };
  console.log(comments);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-[60%] h-[7%] flex items-center justify-between">
        <ArrowLeft
          className="w-[40px] h-[40px]"
          onClick={() => router.push("/")}
        />
        <div className="text-[20px]">Comments</div>
      </div>
      <div className="flex flex-col gap-[60px] w-screen h-[80%] p-[10px] overflow-scroll">
        {comments.map((com) => {
          const formatted = new Date(com.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long", // e.g. October
              day: "numeric", // e.g. 28
            }
          );
          return (
            <div
              key={com._id}
              className="gap-[5px] flex flex-col border-4 rounded-2xl p-[5px]"
            >
              <div className="flex gap-[10px] items-center">
                <img
                  src={com?.user?.profilePic || undefined}
                  alt=""
                  className="w-[45px] h-[45px] rounded-[100%]"
                />
                <h1 className="font-bold">{com?.user?.username}</h1>
              </div>
              <div className="flex flex-col gap-[3px] ">
                <div className="flex justify-between">
                  <div className="text-[20px]">{com?.comment}</div>
                  <div>
                    {com?.user?._id == user?._id ? (
                      <Trash onClick={() => deleteCom(com._id)} />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <h1 className="text-gray-500">{formatted}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottom-0 w-screen h-[20%] border-2  mb-[70px] flex p-[5px] justify-around">
        <div className="flex justify-center items-center">
          <Smile />
        </div>
        <div className="w-[60%] h-[100%]">
          <textarea
            onChange={(e) => handleInput(e)}
            value={input}
            className="w-[100%] h-[100%] border-2 rounded-2xl"
          ></textarea>
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
