import React from "react";
import Button from "../Button/Button";
import { LinkNavbarType } from "@/interfaces/navigation.interface";
import { linkNavbar } from "@/configs/navigation/header.config";

const MenuDropDown = ({ openMenuDropDown }: { openMenuDropDown: boolean }) => {
  return (
    <div
      className={`fixed z-1001  w-[250px] h-screen bg-background backdrop-blur-[5px] transition-all duration-500 -left-[270px] p-5 lg:hidden
        ${openMenuDropDown ? "animate-move" : "animate-move-out"}`}
    >
      <div className="bg-background-card p-5">
        <Button
          title="Đăng nhập"
          className="w-full py-2.5 [&_span]:text-base"
        />
      </div>
      <nav className="mt-2.5">
        <ul className="flex-column gap-2.5 ">
          {linkNavbar.map((link: LinkNavbarType) => (
            <li key={link.id} className="flex-1 flex">
              <a
                href={link.url}
                className={`group text-white font-semibold relative text-base flex-1
               hover:text-primary py-2 transition-colors duration-500
               `}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuDropDown;
