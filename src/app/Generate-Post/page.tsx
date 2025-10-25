"use client";
import { Button } from "@/components/ui/button";
import { HeaderIcon } from "../_components/HeaderIcon";
import { useRouter } from "next/navigation";
import { FooterIcon } from "../_components/footer";
import { Image } from "lucide-react";
const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <HeaderIcon />
      <div className="w-[100%] h-[70%] flex flex-col gap-[10px] justify-center items-center">
        <div>
          <Image className="w-[100px] h-[100px]" />
        </div>
        <div>
          <Button onClick={() => router.push("/file")}>
            Upload From Computer
          </Button>
        </div>
        <div>
          <Button className="w-[185px]" onClick={() => router.push("generate")}>
            generate with AI
          </Button>
        </div>
      </div>
      <FooterIcon />
    </div>
  );
};
export default Page;
