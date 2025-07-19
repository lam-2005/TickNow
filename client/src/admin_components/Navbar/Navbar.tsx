"use client";
import linkInterface, { links } from "@/configs/navigation/admin.config";
import { useToggleNav } from "@/hooks/contexts/ToggleNavContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { TfiDashboard } from "react-icons/tfi";

const Navbar = () => {
  const pathname = usePathname();
  const { toggle } = useToggleNav();
  const [subMenuOpen, setSubMenuOpen] = useState<{ report: boolean }>({
    report: true,
  });
  useEffect(() => {
    if (pathname !== "/admin" || pathname.startsWith("/admin/dashboard"))
      setSubMenuOpen({ ...subMenuOpen, report: false });
  }, [pathname]);
  return (
    <>
      {toggle && (
        <div className="group active bg-foreground max-h-screen h-full sticky text-white z-1000 flex flex-col top-0 left-0 min-w-[230px] max-w-[300px]">
          <Link
            href={"/admin"}
            className="h-[80px] sticky top-0 z-1000 flex-center py-[15px]  border-b-1 border-border-navbar"
          >
            <Image
              src={"/logo/logo.webp"}
              alt="TickNow"
              width={150}
              height={50}
              style={{ height: "50px", width: "150px", objectFit: "contain" }}
              priority
            />
          </Link>
          <div className="flex-column  gap-2.5 overflow-y-auto flex-1">
            <div>
              <div
                className={`cursor-pointer font-base p-2.5 rounded-[5px] text-white flex capitalize gap-2.5 items-center hover:bg-[rgba(255,255,255,0.1)]
                  `}
                onClick={() =>
                  setSubMenuOpen({
                    ...setSubMenuOpen,
                    report: !subMenuOpen.report,
                  })
                }
              >
                <span className="flex justify-center text-white items-center text-2xl">
                  <TfiDashboard />
                </span>{" "}
                <p className="text-sm text-white">Thống kê</p>
                <span
                  className={`flex justify-center text-white items-center text-2xl ml-14 ${
                    subMenuOpen.report ? "active" : ""
                  } [&.active]:-rotate-180 transition-all`}
                >
                  <BiChevronDown />
                </span>
              </div>
              {
                <div
                  className={`text-sm ${
                    subMenuOpen.report ? "block" : "hidden"
                  }`}
                >
                  <Link
                    href={"/admin"}
                    className={`py-2 pl-11 block ${
                      pathname === "/admin" ? "bg-white/10" : "bg-black/50"
                    }`}
                  >
                    Tổng quan
                  </Link>
                  <Link
                    href={"/admin/dashboard/movie"}
                    className={`py-2 pl-11 block ${
                      pathname === "/admin/dashboard/movie"
                        ? "bg-white/10"
                        : "bg-black/50"
                    }`}
                  >
                    Doanh thu theo phim
                  </Link>
                  <Link
                    href={"/admin/dashboard/cinema"}
                    className={`py-2 pl-11 block ${
                      pathname === "/admin/dashboard/cinema"
                        ? "bg-white/10"
                        : "bg-black/50"
                    }`}
                  >
                    Doanh thu theo rạp
                  </Link>
                </div>
              }
            </div>
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
        </div>
      )}
    </>
  );
};

export default Navbar;
