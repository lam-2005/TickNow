"use client";
import React from "react";
import s from "./header.module.css";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import linkInterface from "../../links/links";
import { usePathname } from "next/navigation";
const Header = ({
  toggleNav,
  links,
}: {
  toggleNav: () => void;
  links: linkInterface[];
}) => {
  const pathname = usePathname();
  const title = links.find((l: linkInterface) => l.url === pathname)?.title;

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.title_header}>
          <button className={`${s.toggle_nav}`} onClick={toggleNav}>
            <span>
              <FiMenu />
            </span>
          </button>
          <div className={s.title}>{title}</div>
        </div>
        <div className={s.setting}>
          <button className={s.notification}>
            <span>
              <GoBell />
            </span>
          </button>
          <div className={s.line}></div>
          <div className={s.user}>
            <span>
              <FaUser />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
