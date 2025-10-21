"use client";
import { Button } from "@/components/ui/button";
import { upload } from "@vercel/blob/client";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [file, setFile] = useState<File>();
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
  const createPost = async () => {
    if (!file) return;
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "api/upload",
    });
    console.log(uploaded);
  };
  return (
    <div>
      <input type="file" accept="jpeg/png" onChange={(e) => handleInput(e)} />
      <Button onClick={() => createPost()}>CreatePost</Button>
    </div>
  );
};
export default Page;
