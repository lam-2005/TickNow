"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { linkNavbar } from "@/configs/navigation/header.config";
import { LinkNavbarType } from "@/interfaces/navigation.interface";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import MenuDropDown from "./MenuDropDown";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import ThemeToggle from "../Button/ThemeToggle";
import SearchPopup from "../Popup/SearchPopup";

const Header = () => {
  const pathname = usePathname();
  const [openMenuDropDown, setOpenMenuDropDown] = useState(false);
  const [openUserFormContainer, setOpenUserFormContainer] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isTransparentHeader = pathname === "/" || pathname.startsWith("/detail");
  const [searchText, setSearchText] = useState<string | "">("");


  const headerClass = isTransparentHeader
    ? "min-[480px]:bg-gradient-to-b from-[rgba(0,0,0,.7)] via-[rgba(0,0,0,.2)] to-transparent absolute z-999 top-0 max-[480px]:sticky max-[480px]:bg-background-card min-[480px]:[&_.color-icon]:text-white"
    : "bg-background-card sticky z-999 top-0";

  const textColorClass = isTransparentHeader ? "text-white" : "text-foreground";

  const searchFormClass = `group w-full max-w-2xs py-2 flex items-center bg-transparent not-dark:shadow-lg shadow-foreground/50 focus-within:shadow-foreground/90 
    border-1 dark:border-[rgba(255,255,255,.5)] backdrop-blur-[1.75px] transition-all duration-500 relative
    ${
      isTransparentHeader
        ? "min-[480px]:border-[rgba(255,255,255,.5)] min-[480px]:focus-within:border-white min-[480px]:[&_button_span]:text-white min-[480px]:[&>span]:bg-white min-[480px]:[&>input]:text-white border-transparent"
        : "border-transparent focus-within:border-transparent"
    }`;

  return (
    <header className={`${headerClass} w-full transition-colors duration-300`}>
      {openUserFormContainer && (
        <UserFormContainer setOpenUserFormContainer={() => setOpenUserFormContainer(false)} />
      )}

      <MenuDropDown openMenuDropDown={openMenuDropDown} />
      {openMenuDropDown && (
        <div
          className="w-screen h-screen absolute z-1000 top-0 left-0 backdrop-blur-[5px] brightness-50 lg:hidden"
          onClick={() => setOpenMenuDropDown(false)}
        />
      )}

      <div className="py-4 max-[480px]:py-2 flex-between container gap-2.5">
        <Link href="/" className="logo-size aspect-[5/1] relative">
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
            {linkNavbar.map((link: LinkNavbarType) => {
              const isActive = pathname === link.url;
              return (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className={`group font-semibold relative py-2 transition-colors duration-500 hover:text-primary ${
                      isActive ? "text-primary" : textColorClass
                    }`}
                  >
                    <span
                      className="absolute w-full h-0.5 bottom-0 left-0 bg-primary scale-0 
                        group-hover:scale-100 transition-transform duration-600 origin-left group-[.active]:scale-100"
                    />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex gap-5 max-sm:gap-3 items-center">
          <form action="" className={searchFormClass}>
            <button
              type="button"
              className="px-2 flex-center border-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className="font-bold text-foreground">
                <FiSearch />
              </span>
            </button>
            <span className="w-[1px] h-3 bg-foreground"></span>
            <input
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              type="search"
              placeholder="Tìm kiếm"
              className="w-full h-full outline-0 px-2 text-foreground text-xs"
              onChange={(e) => setSearchText(e.target.value)}
            />

            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <div className="absolute -top-4 right-4 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[16px] border-l-transparent border-r-transparent border-b-white" />
                <SearchPopup searchText={searchText} />
              </div>
            )}
          </form>

          <button
            onClick={() => setOpenUserFormContainer(true)}
            className={`hidden lg:flex flex-col items-center gap-[3px] hover:[&_span]:text-primary`}
          >
            <span
              className={`block font-semibold text-2xl transition-colors duration-500 ${textColorClass}`}
            >
              <FaUser />
            </span>
          </button>

          <ThemeToggle />

          <button
            className="lg:hidden relative z-1001"
            onClick={() => setOpenMenuDropDown(!openMenuDropDown)}
          >
            <span className={`color-icon text-icon text-2xl ${openMenuDropDown ? "text-white" : ""}`}>
              {openMenuDropDown ? <IoMdClose /> : <GiHamburgerMenu />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
