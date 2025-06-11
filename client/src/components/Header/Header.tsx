"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { linkNavbar } from "@/configs/navigation/header.config";
import { LinkNavbarType } from "@/interfaces/navigation.interface";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuDropDown from "./MenuDropDown";
import { IoMdClose } from "react-icons/io";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import ThemeToggle from "../Button/ThemeToggle";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const pathname = usePathname();
  const [openMenuDropDown, setOpenMenuDropDown] = useState<boolean>(false);
  const [openUserFormContainer, setOpenUserFormContainer] =
    useState<boolean>(false);
  return (
    <header
      className={`${
        pathname === "/" || pathname.startsWith("/detail")
          ? " min-[480px]:bg-gradient-to-b from-[rgba(0,0,0,.7)] via-[rgba(0,0,0,.2)] to-[rgba(0,0,0,0)] absolute z-999 top-0 max-[480px]:sticky max-[480px]:bg-background-card min-[480px]:[&_.color-icon]:text-white  "
          : "bg-background-card sticky z-999 top-0"
      } 
      w-full transition-colors duration-300 `}
    >
      {openUserFormContainer && (
        <UserFormContainer
          setOpenUserFormContainer={() => setOpenUserFormContainer(false)}
        />
      )}
      <MenuDropDown openMenuDropDown={openMenuDropDown} />
      {openMenuDropDown && (
        <div
          className="w-screen h-screen absolute z-1000 top-0 left-0 backdrop-blur-[5px] brightness-50 lg:hidden"
          onClick={() => setOpenMenuDropDown(false)}
        ></div>
      )}
      <div className="py-4 max-[480px]:py-2 flex-between container gap-2.5">
        <Link href={"/"} className="logo-size aspect-[5/1] relative">
          <Image
            src="/logo/logo.webp"
            alt="logo-ticknow"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 85px, 20vw"
            priority
          />
        </Link>
        <nav className="max-lg:hidden">
          <ul className="flex gap-5">
            {linkNavbar.map((link: LinkNavbarType) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  className={`group font-semibold relative
               hover:text-primary py-2 transition-colors duration-500 [.active]:text-primary ${
                 pathname === "/" || pathname.startsWith("/detail")
                   ? "text-white"
                   : "text-foreground"
               }
               ${pathname === link.url && "active"}
               `}
                >
                  <span
                    className="absolute w-full h-0.5 bottom-0 left-0 bg-primary scale-0 
                group-hover:scale-100 transition-transform duration-600 origin-left link-color
                group-[.active]:scale-100 "
                    aria-hidden="true"
                  ></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-5 max-sm:gap-3 items-center">
          <form
            action=""
            className={`
              ${
                pathname === "/" || pathname.startsWith("/detail")
                  ? " min-[480px]:border-[rgba(255,255,255,.5)] min-[480px]:focus-within:border-white min-[480px]:[&_button_span]:text-white min-[480px]:[&>span]:bg-white min-[480px]:[&>input]:text-white border-transparent"
                  : "border-transparent focus-within:border-transparent"
              }
              group w-full max-w-2xs py-2 flex items-center bg-transparent not-dark:shadow-lg shadow-foreground/50 focus-within:shadow-foreground/90 
             border-1 dark:border-[rgba(255,255,255,.5)] backdrop-blur-[1.75px]  
             dark:focus-within:border-white transition-all duration-500 `}
          >
            <button type="button" className="px-2 flex-center border-0 ">
              <span className="font-bold text-foreground">
                <FiSearch />
              </span>
            </button>
            <span className="w-[1px] h-3 bg-foreground"></span>
            <input
              type="search"
              placeholder="Tìm kiếm"
              className="w-full h-full outline-0 px-2 text-foreground text-xs "
            />
          </form>

          <Link
            href={"#"}
            onClick={() => setOpenUserFormContainer(true)}
            className="flex-col items-center gap-[3px] hover:[&_span]:text-primary  max-lg:hidden"
          >
            <span
              className={`block font-semibold text-nowrap transition-colors duration-500 ${
                pathname === "/" || pathname.startsWith("/detail")
                  ? "text-white"
                  : "text-foreground"
              } text-icon`}
            >
              <FaUser />
            </span>
          </Link>
          <ThemeToggle />

          {openMenuDropDown ? (
            <button
              className="lg:hidden relative z-1001"
              onClick={() => {
                setOpenMenuDropDown(false);
              }}
            >
              <span className="color-icon text-2xl text-white">
                <IoMdClose />
              </span>
            </button>
          ) : (
            <button
              className="lg:hidden"
              onClick={() => {
                setOpenMenuDropDown(true);
              }}
            >
              <span className="color-icon text-icon ">
                <GiHamburgerMenu />
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
