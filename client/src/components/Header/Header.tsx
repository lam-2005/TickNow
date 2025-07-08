"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { linkNavbar } from "@/configs/navigation/header.config";
import { LinkNavbarType } from "@/interfaces/navigation.interface";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaUserCircle } from "react-icons/fa";
import MenuDropDown from "./MenuDropDown";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import SearchPopup from "../Popup/SearchPopup";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "@/utils/redux/selectors/selectorAuth";

const Header = () => {
  const pathname = usePathname();
  const [openMenuDropDown, setOpenMenuDropDown] = useState(false);
  const [openUserFormContainer, setOpenUserFormContainer] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector(authSelector);
  const handleLogout = () => {
    dispatch(logout());
  };

  const isTransparentHeader =
    pathname === "/" || pathname.startsWith("/detail");

  const headerClass = isTransparentHeader
    ? "min-[480px]:bg-gradient-to-b from-[rgba(0,0,0,.7)] via-[rgba(0,0,0,.2)] to-transparent absolute z-1000 top-0 max-[480px]:sticky max-[480px]:bg-background-card min-[480px]:[&_.color-icon]:text-white"
    : "bg-background-card sticky z-1000 top-0";

  const textColorClass = isTransparentHeader ? "text-white" : "text-foreground";

  const searchFormClass = `group w-full max-w-2xs py-2 flex items-center bg-transparent not-dark:shadow-lg shadow-foreground/50 focus-within:shadow-foreground/90  z-1000
    border-1 dark:border-[rgba(255,255,255,.5)] backdrop-blur-[1.75px] transition-all duration-500 relative
    ${
      isTransparentHeader
        ? "min-[480px]:border-[rgba(255,255,255,.5)] min-[480px]:focus-within:border-white min-[480px]:[&_button_span]:text-white min-[480px]:[&>span]:bg-white min-[480px]:[&>input]:text-white border-transparent"
        : "border-transparent focus-within:border-transparent z-1000 min-[480px]:border-[rgba(255,255,255,.5)] min-[480px]:focus-within:border-white "
    }`;

  return (
    <header className={`${headerClass} w-full transition-colors duration-300`}>
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
          <SearchPopup className={searchFormClass} />
          {token ? (
            <div className="relative group">
              <div className="flex-column items-center gap-1">
                <div className="flex-center">
                  <FaUserCircle className="text-3xl" />
                </div>
                <div
                  className={`${
                    isTransparentHeader ? "text-white " : "text-foreground"
                  } text-nowrap line-clamp-1 font-bold text-sm`}
                >
                  {user}
                </div>
              </div>
              <div
                className="bg-background-card absolute top-[calc(100%_+_15px)] right-0 after:absolute after:size-1 after:border-[10px] after:border-transparent after:border-b-background-card after:top-0 after:-translate-y-full after:right-5 before:absolute
              before:w-full before:h-5 before:bg-transparent rounded-[10px] shadow-lg before:top-0 before:right-0 before:-translate-y-full hidden group-hover:block "
              >
                <div
                  className="px-5 py-2.5 text-nowrap hover:bg-background hover:text-primary rounded-t-[10px] cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  Xem thông tin
                </div>
                <div
                  className="px-5 py-2.5 text-nowrap hover:bg-background hover:text-primary rounded-b-[10px] cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          ) : (
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
          )}

          {/* <ThemeToggle /> */}

          <button
            className="lg:hidden relative z-1001"
            onClick={() => setOpenMenuDropDown(!openMenuDropDown)}
          >
            <span
              className={`color-icon text-icon text-2xl ${
                openMenuDropDown ? "text-white" : ""
              }`}
            >
              {openMenuDropDown ? <IoMdClose /> : <GiHamburgerMenu />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
