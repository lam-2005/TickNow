"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { linkNavbar, LinkNavbarType } from "../../links";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuDropDown from "./MenuDropDown";
import { IoMdClose } from "react-icons/io";
const Header = () => {
  const pathname = usePathname();
  const [activeHeader, setActiveHeader] = useState<boolean>(false);
  const [openMenuDropDown, setOpenMenuDropDown] = useState<boolean>(false);
  useEffect(() => {
    const handleChangeHeader = () => {
      setActiveHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleChangeHeader);
    return () => {
      window.removeEventListener("scroll", handleChangeHeader);
    };
  }, []);
  return (
    <header
      className={`${
        pathname === "/"
          ? " bg-gradient-to-b from-[rgba(0,0,0,.7)] via-[rgba(0,0,0,.2)] to-[rgba(0,0,0,0)] "
          : "bg-background-card "
      } 
      w-full transition-colors duration-300 fixed z-999 top-0 max-[480px]:sticky max-[480px]:bg-background-card max-[480px]:border-b-2 border-primary [&.active]:border-b-2
    [&.active]:bg-background-card  ${activeHeader && "active"}`}
    >
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
            src="/logo/logo.png"
            alt="logo-ticknow"
            fill
            className="object-cover"
          />
        </Link>
        <nav className="max-lg:hidden">
          <ul className="flex gap-5">
            {linkNavbar.map((link: LinkNavbarType) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  className={`group text-white font-semibold relative
               hover:text-primary py-2 transition-colors duration-500 [.active]:text-primary
               ${pathname === link.url && "active"}
               `}
                >
                  <span
                    className="absolute w-full h-0.5 bottom-0 left-0 bg-primary scale-0 
                group-hover:scale-100 transition-transform duration-500 
                group-[.active]:scale-100 "
                    aria-hidden="true"
                  ></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-5 items-center">
          <form
            action=""
            className="group w-full max-w-2xs py-2 flex items-center bg-[rgba(0,0,0,.4)]
             border-1 border-[rgba(255,255,255,.5)] backdrop-blur-[1.75px]  
             focus-within:border-white transition-colors duration-500 "
          >
            <button type="button" className="px-2 flex-center border-0 ">
              <span className="font-bold">
                <FiSearch />
              </span>
            </button>
            <span className="w-[1px] h-3 bg-white"></span>
            <input
              type="search"
              placeholder="Tìm kiếm"
              className="w-full h-full outline-0 px-2 text-white text-xs "
            />
          </form>

          <Link
            href={"#"}
            className="flex-col items-center gap-[3px] hover:text-primary transition-colors duration-500 max-lg:hidden"
          >
            <span className="block font-semibold text-nowrap">Đăng nhập</span>
          </Link>
          {openMenuDropDown ? (
            <button
              className="lg:hidden relative z-1001"
              onClick={() => {
                setOpenMenuDropDown(false);
              }}
            >
              <span className="text-2xl">
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
              <span className="text-icon">
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
