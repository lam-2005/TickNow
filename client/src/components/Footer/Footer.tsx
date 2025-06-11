import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import FooterNav from "./FooterNav";
import { footerLink } from "@/configs/navigation/footer.config";
import { FooterLinkType } from "@/interfaces/navigation.interface";

const Footer = () => {
  return (
    <footer className="bg-background-card py-7.5 mt-10 border-t-2 border-primary">
      <div className="container flex-column gap-5">
        <div className="flex gap-7.5 max-lg:flex-col">
          <section className="flex-column gap-2.5 max-lg:items-center max-lg:self-center">
            <div className="logo-size aspect-[5/1] relative">
              <Image
                src="/logo/logo.webp"
                alt="logo-ticknow"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85px, 20vw"
                priority
              />
            </div>
            <p className="font-semibold">Đặt vé dễ dàng, tận hưởng trọn vẹn</p>
            <div className="flex gap-5 [&_a]:text-[clamp(1.125rem,3vw,1.5rem)] [&_a]:block [&_a]:hover:text-primary">
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
          <div className="flex gap-5 flex-wrap flex-1">
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
        <div className="flex-column items-center gap-5">
          <p className="copyright">&copy; 2025 TickNow: All rights reserved</p>

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
