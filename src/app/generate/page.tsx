"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { HeaderIcon } from "../_components/HeaderIcon";
import { FooterIcon } from "../_components/footer";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
const Page = () => {
  const { token } = useUser();
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const handleInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const [photos, setPhotos] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const API_KEY = process.env.API_KEY;
  console.log(inputValue);
  const generateImage = async () => {
    setInputValue("");
    if (!inputValue.trim()) return;
    try {
      toast("This might take few seconds");
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
      toast.error("Cant generate image", {
        style: {},
      });
    }
  };
  console.log(caption);

  const createPost = async () => {
    await fetch("https://ig-backend-p8fz.onrender.com/post/create", {
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

      <div className="flex flex-col gap-[10px] p-[15px]">
        {/* Title */}
        <div>
          <h1 className="font-bold text-[22px] text-gray-900 tracking-wide">
            Explore AI Generated Images
          </h1>
          <p className="text-gray-600 text-[14px] mt-[2px]">
            Describe what is on your mind. For best results, be specific.
          </p>
        </div>

        {/* Prompt input */}
        <div>
          <Textarea
            onChange={(e) => handleInputValue(e)}
            placeholder="Please Enter Your Prompt"
            className="w-[398px] h-[102px] border-4 border-black rounded-xl shadow-md focus:ring-2 focus:ring-gray-800 transition-all duration-200"
            value={inputValue}
          />
        </div>

        <div className="flex justify-center mt-[10px]">
          <Button
            onClick={generateImage}
            className="w-[60%] h-[45px] bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            Generate
          </Button>
        </div>

        <div className="p-[5px]">
          <div className="flex border-4 border-black rounded-xl overflow-auto w-full h-[300px] flex-wrap gap-[10px] p-[10px] bg-white shadow-inner bar">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={photo}
                  alt=""
                  className="w-[140px] h-[200px] object-cover rounded-lg shadow-md border border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Textarea
            placeholder="Please Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border-4 border-black rounded-xl shadow-md focus:ring-2 focus:ring-gray-800 transition-all duration-200"
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={createPost}
            className="w-[60%] h-[45px] bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            Create Post
          </Button>
        </div>
      </div>

      <Toaster className="bg-green-500" />
      <FooterIcon />
    </div>
  );
};
export default Page;
