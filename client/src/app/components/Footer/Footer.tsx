import { footerLink, FooterLinkType } from "@/app/links";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="bg-background-card py-7.5 mt-20">
      <div className="container flex-column gap-5">
        <div className="flex">
          <section className="flex-column gap-2.5 pr-7.5">
            <div>
              <Image
                src="/logo/logo.png"
                alt="logo-ticknow"
                width={150}
                height={37}
                className="object-cover"
              />
            </div>
            <p className="ml-3 font-semibold">
              Đặt vé dễ dàng, tận hưởng trọn vẹn
            </p>
            <div className="ml-3 flex gap-5 [&_a]:text-2xl [&_a]:block [&_a]:hover:text-primary">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTiktok />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </section>
          <div className="flex flex-1">
            {footerLink.map((link: FooterLinkType) => (
              <FooterNav
                key={link.id}
                title={link.title}
                link={link.children}
              />
            ))}
          </div>
        </div>
        <hr className="block" />
        <div className="flex-column items-center gap-5 text-sm">
          <div className="copyright">
            &copy; 2025 TickNow: All rights reserved
          </div>

          <p>
            <strong>NHÓM:</strong> TICKNOW
          </p>
          <p>
            <strong>ĐỊA CHỈ:</strong> FPT POLYTECHNIC HỒ CHÍ MINH
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
