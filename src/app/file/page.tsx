"use client";
import { Button } from "@/components/ui/button";
import { upload } from "@vercel/blob/client";
import { ChangeEvent, useState } from "react";
import { footerIcon as FooterIcon } from "../_components/footer";
import { headerIcon as HeaderIcon } from "../_components/HeaderIcon";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
const Page = () => {
  const { token } = useUser();
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [photos, setPhotos] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
  const add = async () => {
    if (!file) return;
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "api/upload",
    });
    setPhotos((prev) => [...prev, uploaded.url]);
    console.log(uploaded);
  };
  const handleCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCaption(value);
  };
  const createPost = async () => {
    await fetch("http://localhost:5555/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: caption,
        images: photos,
      }),
    });
    router.push("/");
  };
  return (
    <div className="w-screen h-screen flex flex-col gap-[10px]">
      <HeaderIcon />
      <div className="w-[100%] h-[60%] flex p-[10px] flex-col mt-[20px] gap-[30px]  ">
        <div className="top-0 flex justify-around">
          <div>
            <ImageUp className="w-[120px] h-[120px]" />
          </div>
          <div className="flex flex-col justify-around h-[120px]">
            <Input
              type="file"
              accept="jpeg/png"
              onChange={(e) => handleInput(e)}
              className=" w-[250px] h-[80px]"
            />
            <Button onClick={() => add()}>Add</Button>
          </div>
        </div>
        <div className="flex border-4 overflow-scroll w-[100%] h-[2000px] flex-wrap gap-[5px] p-[5px] border-black gra">
          {photos.map((photo, index) => {
            return (
              <div key={index}>
                <img src={photo} alt="" className="w-[140px] h-[200px]" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <Textarea
          className="w-[80%] border-4 border-black h-[60px]"
          rows={2}
          placeholder="Please Enter Your Caption"
          onChange={(e) => handleCaption(e)}
        />
      </div>
      <div className="w-screen flex justify-center">
        <Button className="w-[200px] h-[40px]" onClick={() => createPost()}>
          CreatePost
        </Button>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
