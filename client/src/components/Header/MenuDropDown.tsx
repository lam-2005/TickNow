import React, { useState } from "react";
import Button from "../Button/Button";
import { LinkNavbarType } from "@/interfaces/navigation.interface";
import { linkNavbar } from "@/configs/navigation/header.config";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/contexts/useAuth";
import { privateRoute } from "@/middleware";
import { toast } from "react-toastify";
const MenuDropDown = ({ openMenuDropDown }: { openMenuDropDown: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openUserFormContainer, setOpenUserFormContainer] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { setUser, user } = useAuth();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "user" }),
      });
      localStorage.removeItem("user");
      if (privateRoute.user.some((url) => pathname.startsWith(url)))
        router.push("/");
      setUser(null);
    } catch (error) {
      toast.error("Có lỗi khi đăng xuất");
      console.error(error);
    }
  };

  return (
    <>
      {openUserFormContainer && (
        <UserFormContainer
          setOpenUserFormContainer={() => setOpenUserFormContainer(false)}
        />
      )}
      <div
        className={`fixed z-1001  w-[250px] h-screen bg-background backdrop-blur-[5px] transition-all duration-500 -left-[270px] p-5 lg:hidden
          ${openMenuDropDown ? "animate-move" : "animate-move-out"}`}
      >
        <div className="bg-background-card p-5">
          {user ? (
            <div
              className="relative cursor-pointer transition-all"
              onClick={() => setOpenUser(!openUser)}
            >
              {" "}
              <div className="flex-between gap-5">
                <div className="flex items-center gap-1">
                  <div className="flex-center">
                    <FaUserCircle className="text-3xl" />
                  </div>
                  <div
                    className={` text-nowrap line-clamp-1 font-bold text-sm`}
                  >
                    {user?.name}
                  </div>
                </div>
                <button
                  className={`text-2xl transition-all ${
                    openUser ? "-rotate-180" : ""
                  }`}
                >
                  <BiChevronDown />
                </button>
              </div>
              {openUser && (
                <div className="bg-background-card  mt-3">
                  <div
                    className="py-2 hover:text-primary rounded-t-[10px] cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Xem thông tin
                  </div>
                  <div
                    className="py-2 hover:text-primary rounded-b-[10px] cursor-pointer"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              title="Đăng nhập"
              onClick={() => setOpenUserFormContainer(true)}
              className="w-full py-2.5 [&_span]:text-base"
            />
          )}
        </div>
        <nav className="mt-2.5">
          <ul className="flex-column gap-2.5 ">
            {linkNavbar.map((link: LinkNavbarType) => (
              <li key={link.id} className="flex-1 flex">
                <a
                  href={link.url}
                  className={`
                    group text-foreground font-semibold relative text-base flex-1 
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
    </>
  );
};

export default MenuDropDown;
