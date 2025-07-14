"use client";
import { links } from "@/configs/navigation/admin.config";
import { useToggleNav } from "@/hooks/contexts/ToggleNavContext";
import { useAuth } from "@/hooks/contexts/useAuth";
// import { privateRoute } from "@/middleware";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
// import { GoBell } from "react-icons/go";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setToggle, toggle } = useToggleNav();
  const title =
    links.find((link) => pathname === link.url)?.title || "Trang Chủ";

  const { setAdmin, admin } = useAuth();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "admin" }),
      });
      localStorage.removeItem("admin");
      router.refresh();
      setAdmin(null);
    } catch (error) {
      toast.error("Có lỗi khi đăng xuất");
      console.error(error);
    }
  };

  return (
    <header className="flex sticky top-0 w-full z-1000 items-start">
      <div className="flex-between text-xl flex-1 bg-white py-2.5 px-[25px] border-b-1 border-border-container [&_button]:bg-transparent [&_button]:border-transparent [&_button_span]:flex-center [&_button_span]:text-xl">
        <div className="flex items-center gap-2.5">
          <button className="cursor-pointer" onClick={() => setToggle(!toggle)}>
            <span className="">
              <FiMenu />
            </span>
          </button>
          <div className="capitalize">{title}</div>
        </div>
        <div className="flex items-center gap-2.5">
          {/* <button>
            <span>
              <GoBell />
            </span>
          </button>
          <div className="h-7.5 w-[2px] bg-gray-500"></div> */}
          {admin && (
            <div className="relative group">
              <div
                onClick={() => router.push("/admin/profile")}
                className="flex-column items-center"
              >
                <div className=" border-1 hover:cursor-pointer border-gray-500 rounded-[50%] w-10 h-10 flex-center bg-black text-white ">
                  <span className="text-white">
                    <FaUser />
                  </span>
                </div>
                <div className="text-base">{admin.name}</div>
              </div>
              <div
                className="group-hover:block hidden absolute -right-3 bg-background-card top-[calc(100%_+_20px)] shadow-xl shadow-black/20 shadow- rounded-md after:absolute after:w-full after:h-15 after:bg-transparent after:top-0 after:left-0 after:-translate-y-full 
              before:absolute before:size-1 before:border-[10px] before:border-transparent before:border-b-background-card before:top-0 before:-translate-y-full before:right-5"
              >
                <div
                  className="px-5 py-2.5 text-nowrap hover:bg-stone-200 hover:text-primary rounded-t-[10px] cursor-pointer text-base"
                  onClick={() => router.push("/admin/profile")}
                >
                  Xem thông tin
                </div>
                <div
                  className="px-5 py-2.5 text-nowrap hover:bg-stone-200  hover:text-primary rounded-b-[10px] cursor-pointer  text-base"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
