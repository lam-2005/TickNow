import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className=" flex gap-4">
      <div className="w-10 h-10 bg-white flex-center border-black/10 border flex-shrink-0 rounded-full self-end">
        <Image src={"/logo/logoT.webp"} alt="logo" width={20} height={20} />
      </div>
      <div className="flex-column gap-2 w-full">
        <div className="text-background text-sm max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5">
          <div className="flex flex-row gap-1 p-1.5" key="loading">
            <div className="size-1.5 rounded-full bg-background/50 animate-bounce"></div>
            <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.3s]"></div>
            <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
