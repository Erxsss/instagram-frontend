"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  // const push 
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-[147px] h-[201px] flex flex-col gap-[10px]">
        <div>
          <Button>Photo Library</Button>
        </div>
        <div>
          <Button onClick={()=>router.push("generate")}>generate with </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
