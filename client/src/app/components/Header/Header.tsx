"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { linkNavbar, LinkNavbarType } from "../../links";
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  const pathname = usePathname();
  const [activeHeader, setActiveHeader] = useState(false);
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
          : "bg-background-card"
      } 
      min-w-screen transition-all duration-500 fixed z-999 top-0
    [&.active]:bg-background-card ${activeHeader && "active"}`}
    >
      <div className="py-4 flex-between container">
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
          <button type="button" className="flex-center border-0 ">
            <span className="font-bold text-[clamp(1.125rem,3vw,1.5rem)] lg:hidden">
              <FiSearch />
            </span>
          </button>
          <form
            action=""
            className="group min-w-[220px] max-w-2xs py-2 flex items-center bg-[rgba(0,0,0,.4)]
             border-1 border-[rgba(255,255,255,.5)] backdrop-blur-[1.75px] max-lg:hidden 
             focus-within:border-white transition-colors duration-500"
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
            <span className="block font-semibold">Đăng nhập</span>
          </Link>
          <button className="lg:hidden">
            <span className="text-[clamp(1.125rem,3vw,1.5rem)]">
              <GiHamburgerMenu />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
