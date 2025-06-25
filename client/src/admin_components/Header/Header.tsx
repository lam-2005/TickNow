"use client";
import { links } from "@/configs/navigation/admin.config";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const title =
    links.find((link) => pathname === link.url)?.title || "Trang Chủ";
  return (
    <header className="flex sticky top-0 w-full z-1000 items-start h-[80px]">
      <div className="flex-between text-xl flex-1 bg-white py-5 px-[25px] border-b-1 border-border-container [&_button]:bg-transparent [&_button]:border-transparent [&_button_span]:flex-center [&_button_span]:text-xl">
        <div className="flex items-center gap-2.5">
          <button className="cursor-pointer">
            <span className="">
              <FiMenu />
            </span>
          </button>
          <div className="capitalize">{title}</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button>
            <span>
              <GoBell />
            </span>
          </button>
          <div className="h-7.5 w-[2px] bg-gray-500"></div>
          <div
            className="border-1 hover:cursor-pointer border-gray-500 rounded-[50%] w-10 h-10 flex-center bg-black text-white "
            onClick={() => router.push("/admin/profile")}
          >
            <span className="text-white">
              <FaUser />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
