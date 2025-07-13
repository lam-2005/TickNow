"use client";
import linkInterface, { links } from "@/configs/navigation/admin.config";
import { useToggleNav } from "@/hooks/contexts/ToggleNavContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const { toggle } = useToggleNav();
  return (
    <>
      {toggle && (
        <div className="group active bg-foreground max-h-screen h-full sticky text-white z-1000 flex flex-col top-0 left-0 min-w-[230px] max-w-[300px]">
          <Link
            href={"/admin"}
            className="h-[80px] sticky top-0 z-1000 flex-center py-[15px]  border-b-1 border-border-navbar"
          >
            <Image src={"/logo/logo.webp"} alt="" width={150} height={50} />
          </Link>
          <div className="flex-column p-2.5 gap-2.5 overflow-y-auto flex-1">
            {links.map((l: linkInterface) => (
              <Link
                key={l.id}
                className={`font-base p-2.5 rounded-[5px] text-white flex capitalize gap-2.5 items-center hover:bg-[rgba(255,255,255,0.1)] ${
                  pathname === l.url && "bg-[rgba(255,255,255,0.1)]"
                }`}
                href={l.url}
              >
                <span className="flex justify-center text-white items-center text-2xl">
                  {l.icon}
                </span>{" "}
                <p className="text-sm text-white">{l.title}</p>
              </Link>
            ))}
          </div>
          <div className="py-2.5 px-5 flex justify-end border-t-1 border-border-navbar">
            <button className="border-transparent bg-transparent cursor-pointer group/toggle">
              <span className="flex-center text-2xl text-stone-500 group-hover/toggle:text-white">
                <MdKeyboardDoubleArrowLeft />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
