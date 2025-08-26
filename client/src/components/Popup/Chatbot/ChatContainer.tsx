"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoMdSend } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import ChatbotBtn from "@/components/Button/ChatbotBtn";
import ListPrompt from "./ListPrompt";
import { FaSquare } from "react-icons/fa";
import { chatBotAPI } from "@/services/movie.service";
import { MovieType } from "@/interfaces/movie.interface";

type MessageType = {
  role: "user" | "bot";
  message: string[];
  data?: MovieType[];
};

const INITIAL_BOT_MESSAGE: MessageType = {
  role: "bot",
  message: [
    "Xin chào tôi là trợ lí AI của TickNow",
    "Tôi có thể giúp gì cho bạn?",
  ],
};

const ChatContainer = () => {
  const [showPrompt, setShowPrompt] = React.useState(true);
  const [hiddenChatbot, setHiddenChatbot] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState("");
  const [message, setMessage] = React.useState<MessageType[]>([
    INITIAL_BOT_MESSAGE,
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessage(JSON.parse(saved));
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputFocusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(message));
  }, [message]);

  const toggleChatbot = () => {
    setHiddenChatbot((prev) => !prev);
    if (!hiddenChatbot) {
      inputFocusRef.current?.focus();
    }
  };

  const fakeBotReply = async (content: string) => {
    setLoading(true);
    try {
      const res = await chatBotAPI(content);
      console.log(res.data);
      setMessage((prev) => [
        ...prev,
        {
          ...res.data,
          message: [res.data.message || "Xin lỗi, tôi chưa hiểu."],
          data: res.data.data || [],
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessage((prev) => [
        ...prev,
        { role: "bot", message: ["Đã xảy ra lỗi, vui lòng thử lại."] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setMessage((prev) => [...prev, { role: "user", message: [content] }]);
    setInputMessage("");
    setShowPrompt(false);

    await fakeBotReply(content);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    inputFocusRef.current?.focus();
    sendMessage(inputMessage);
  };

  const handleSelectPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleReset = () => {
    inputFocusRef.current?.focus();
    setMessage([INITIAL_BOT_MESSAGE]);
    setShowPrompt(true);
    localStorage.removeItem("chatMessages");
  };

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
        className={`fixed z-[2002] bottom-5 right-5 max-w-[400px] w-full h-[500px] bg-foreground rounded-lg flex-column text-background transition-all duration-300 ease-in-out ${
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
              onClick={handleReset}
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
              <BotMessage
                key={index}
                messages={msg.message}
                data={msg.data || []}
              />
            ) : (
              <UserMessage key={index} messages={msg.message} />
            )
          )}
          {loading && (
            <BotMessage
              messages={[
                <div className="flex flex-row gap-1 p-1.5" key="loading">
                  <div className="size-1.5 rounded-full bg-background/50 animate-bounce"></div>
                  <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.3s]"></div>
                  <div className="size-1.5 rounded-full bg-background/50 animate-bounce [animation-delay:-.5s]"></div>
                </div>,
              ]}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {showPrompt && <ListPrompt onSelectPrompt={handleSelectPrompt} />}

        <div className="px-4 ">
          <form
            className="flex w-full bg-black/10 rounded-lg items-center "
            onSubmit={handleSendMessage}
          >
            <input
              ref={inputFocusRef}
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full px-4 py-2 focus:outline-none outline-none border-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="group p-2.5 text-xl "
            >
              {loading ? (
                <FaSquare className="text-primary animate-pulse text-lg cursor-wait" />
              ) : (
                <IoMdSend className="group-disabled:text-black/50 group-disabled:pointer-events-none group-disabled:opacity-50 text-primary" />
              )}
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
