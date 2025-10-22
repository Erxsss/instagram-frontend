"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/provider/AuthProvider";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { headerIcon as HeaderIcon } from "../_components/HeaderIcon";
import { footerIcon as FooterIcon } from "../_components/footer";
import { Textarea } from "@/components/ui/textarea";
const Page = () => {
  const { token } = useUser();
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const handleInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const API_KEY = process.env.API_KEY;
  console.log(inputValue);
  const generateImage = async () => {
    setInputValue("");
    if (!inputValue.trim()) return;
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      };
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            inputs: inputValue,
            parameter: {
              negative_prompt: "blurry , bad quality,disorted",
              num_inference_steps: 20,
              guidance_scale: 7.6,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      }
      const blob = await response.blob();
      const file = new File([blob], "generated.png", { type: "image/png" });
      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "api/upload",
      });
      const imageUrl = uploaded.url;
      console.log(uploaded);
      setPhotos((prev) => [...prev, imageUrl]);
    } catch (err) {
      setIsLoading(false);
    }
  };
  console.log(caption);

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
  console.log(photos);
  return (
    <div className="w-[100vw] h-[100vh]">
      <HeaderIcon />
      <div className="flex flex-col gap-[5px] p-[10px]">
        <div>
          <h1 className="font-bold text-[20px]">Explore AI Generated Images</h1>
        </div>
        <div>
          <p className="text-gray-600">
            Describe what is on your mind. For best results, be specific
          </p>
        </div>
        <div>
          <Textarea
            onChange={(e) => handleInputValue(e)}
            placeholder="Please Enter Your Prompt"
            className="w-[398px] h-[102px] border-4 border-black"
            value={inputValue}
          />
        </div>
        <div className="flex justify-center mt-[5px] ">
          <Button onClick={generateImage} className="gButton w-[60%] h-[40px]">
            Generate
          </Button>
        </div>
        <div className="p-[5px]">
          <div className="flex border-4 overflow-scroll w-[100%] h-[300px] flex-wrap gap-[5px] p-[5px] border-black">
            {photos.map((photo, index) => {
              return (
                <div key={index}>
                  <img src={photo} alt="" className="w-[140px] h-[200px]" />
                </div>
              );
              t;
            })}
          </div>
        </div>
        <div>
          <Textarea
            placeholder="Please Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border-4 border-black"
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={createPost} className="w-[60%] h-[40px]">
            Create Post
          </Button>
        </div>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
