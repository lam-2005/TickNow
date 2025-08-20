import Image from "next/image";
import React from "react";

const BotMessage = ({
  messages,
}: {
  messages: string[] | React.ReactElement[];
}) => {
  return (
    <div className=" flex gap-4">
      <div className="w-10 h-10 bg-white flex-center border-black/10 border flex-shrink-0 rounded-full self-end">
        <Image src={"/logo/logoT.webp"} alt="logo" width={20} height={20} />
      </div>
      <div className="flex-column gap-2 w-full">
        {messages.map((message, index) => (
          <div
            key={index}
            className="text-background text-sm max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 break-words"
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotMessage;
