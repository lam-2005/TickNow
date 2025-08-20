"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import { FiMinus } from "react-icons/fi";
import ChatbotBtn from "@/components/Button/ChatbotBtn";
type MessageType = {
  role: "user" | "bot";
  content: string[];
};
const ChatContainer = () => {
  const [hiddenChatbot, setHiddenChatbot] = React.useState(false);
  const toggleChatbot = () => {
    setHiddenChatbot((prev) => !prev);
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState("");
  const [message, setMessage] = React.useState<MessageType[]>([
    {
      role: "bot",
      content: [
        "Xin chào tôi là trợ lí AI của TickNow",
        "Tôi có thể giúp gì cho bạn?",
      ],
    },
  ]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;
    setMessage((prev) => [...prev, { role: "user", content: [inputMessage] }]);
    setInputMessage("");

    setLoading(true);
    setTimeout(() => {
      setMessage((prev) => [
        ...prev,
        {
          role: "bot",
          content: [
            "Tôi đã nhận được tin nhắn của bạn",
            "Bạn là cái l gì mà tôi phải trả lời",
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      <div
        onClick={toggleChatbot}
        className={`fixed z-[1999] overflow-hidden h-30 flex-center bottom-30 right-5 translate-x-15 transition-all duration-300 ease-in-out cursor-pointer ${
          hiddenChatbot
            ? "opacity-0 translate-y-15 pointer-events-none"
            : "opacity-100 translate-y-10 delay-100"
        }`}
      >
        <ChatbotBtn />
      </div>
      <div
        className={`fixed z-[2002] bottom-5 right-5 max-w-[400px] w-full h-[80vh] bg-foreground rounded-lg flex-column text-background transition-all duration-300 ease-in-out ${
          hiddenChatbot
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <div className="w-full bg-primary h-[60px] rounded-t-lg flex items-center p-4 justify-between">
          <div className="flex items-center gap-2 ">
            <div className="size-[40px] rounded-full bg-white flex-center">
              <Image
                src={"/logo/logoT.webp"}
                alt="logo"
                width={25}
                height={25}
              />
            </div>
            <p className="font-bold text-lg">TickNow</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="text-2xl text-white p-2 rounded-md hover:bg-black/10"
              onClick={() => {
                setMessage([
                  {
                    role: "bot",
                    content: [
                      "Xin chào tôi là trợ lí AI của TickNow",
                      "Tôi có thể giúp gì cho bạn?",
                    ],
                  },
                ]);
              }}
            >
              <HiMiniArrowPath />
            </button>
            <button
              className="text-2xl text-white p-2 rounded-md hover:bg-black/10"
              onClick={toggleChatbot}
            >
              <FiMinus />
            </button>
          </div>
        </div>
        <div className="h-full overflow-x-hidden overflow-y-auto flex-column gap-4 p-4">
          {message.map((msg, index) =>
            msg.role === "bot" ? (
              <BotMessage key={index} messages={msg.content} />
            ) : (
              <UserMessage key={index} messages={msg.content} />
            )
          )}
          {loading && (
            <BotMessage
              messages={[
                <>
                  <div className="flex flex-row gap-2 p-2.5">
                    <div className="size-1.5 rounded-full bg-background/50 animate-bounce"></div>
                    <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </>,
              ]}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 ">
          <form
            action=""
            className="flex w-full bg-black/10 rounded-lg items-center "
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full px-4 py-2 focus:outline-none outline-none border-none"
            />
            <button
              className={`p-2.5 text-black text-xl ${
                !message ? "pointer-events-none opacity-50" : "text-primary"
              }`}
            >
              <IoMdSend />
            </button>
          </form>
        </div>
        <p className="text-[11px] text-background text-center px-4 py-2">
          Thông tin chỉ mang tính tham khảo, được tư vấn bởi Trí Tuệ Nhân Tạo
        </p>
      </div>
    </>
  );
};

export default ChatContainer;
