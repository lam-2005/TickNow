import React from "react";

const UserMessage = ({ messages }: { messages: string[] }) => {
  return (
    <div className="flex gap-2 self-end w-full flex-col items-end">
      {messages.map((message, index) => (
        <div
          key={index}
          className="text-foreground text-sm max-w-[90%] w-fit rounded-xl bg-primary p-2.5"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default UserMessage;
