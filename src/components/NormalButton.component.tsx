"use client";

import { useRouter } from "next/navigation";

type normalButtonProps = {
  title: string;
  type?: string;
  completeHandler?(): void;
};

export default function NormalButton({
  title,
  type,
  completeHandler,
}: normalButtonProps) {
  const router = useRouter();
  const handleCancle = () => router.push("/profile/");

  return (
    <button
      onClick={type === "cancel" ? handleCancle : completeHandler}
      className={`${
        type === "cancel"
          ? "bg-[#F6F6F6] text-[#A5A5A5]"
          : "bg-[#AB74FF] text-white"
      } w-full  text-base py-[15px] flex items-center justify-center bg-[#AB74FF] rounded-[100px]`}
    >
      {title}
    </button>
  );
}
