"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.API_KEY;
  console.log(inputValue);
  const generateImage = async () => {
    setInputValue("");
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setImageUrl("");
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
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const isEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      generateImage();
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] p-[20px] ">
      <div className="flex flex-col gap-[5px]">
        <div>
          <h1 className="font-bold text-[20px]">Explore AI Generated Images</h1>
        </div>
        <div>
          <p className="text-gray-600">
            Describe what is on your mind. For best results, be specific
          </p>
        </div>
        <div>
          <Input
            onChange={(e) => handleInputValue(e)}
            placeholder="Please Enter Your Prompt"
            className="w-[398px] h-[102px]"
            disabled={isLoading}
            value={inputValue}
            onKeyDown={(e) => isEnterPressed(e)}
          />
        </div>
        <div className="flex justify-center mt-[5px] ">
          <Button
            onClick={generateImage}
            disabled={!inputValue.trim() || isLoading}
            className="gButton"
          >
            Generate
          </Button>
        </div>
        <div>
          <img className="rounded-2xl" src={imageUrl} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Page;
