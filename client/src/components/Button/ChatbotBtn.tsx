"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const ChatbotBtn = () => {
  return (
    <div className="fixed z-[1999] bottom-20 right-5 translate-x-15 translate-y-10">
      <DotLottieReact
        src="https://lottie.host/ada37016-8bd2-4861-aee6-9b9e9f58f870/lQQAgLeGfB.lottie"
        loop
        className="w-[200px]"
        width={150}
        autoplay
      />
    </div>
  );
};

export default ChatbotBtn;
