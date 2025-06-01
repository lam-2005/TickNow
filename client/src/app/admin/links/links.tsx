import { TfiDashboard } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { TbBrandCarbon } from "react-icons/tb";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAccessTime, MdOutlineChair, MdOutlineLocalOffer } from "react-icons/md";
import { ReactNode } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { GiTheaterCurtains } from "react-icons/gi";
import { PiFilmSlateDuotone } from "react-icons/pi";

export default interface linkInterface {
  id: number;
  title: string;
  url: string;
  icon: ReactNode;
}
const links: linkInterface[] = [
  {
    id: 1,
    title: "Thống kê",
    url: "/admin/adminGlobal/dashboard",
    icon: <TfiDashboard />,
  },
  {
    id: 2,
    title: "Người dùng",
    url: "/admin/adminGlobal/user",
    icon: <FaRegUser />,
  },
  {
    id: 3,
    title: "Thương hiệu",
    url: "/admin/adminGlobal/brand",
    icon: <TbBrandCarbon />,
  },
  {
    id: 4,
    title: "Hóa đơn",
    url: "/admin/adminGlobal/payments",
    icon: <FaRegMoneyBillAlt />,
  },
  {
    id: 5,
    title: "Khuyến mãi",
    url: "/admin/adminGlobal/vouchers",
    icon: <MdOutlineLocalOffer />,
  },
];
const linkLocal: linkInterface[] = [
  {
    id: 1,
    title: "Thống kê",
    url: "/admin/adminLocal/dashboard",
    icon: <TfiDashboard />,
  },
  {
    id: 2,
    title: "Quản lí phim",
    url: "/admin/adminLocal/film",
    icon: <PiFilmSlateDuotone />,
  },
  {
    id: 3,
    title: "Quản lí vé",
    url: "/admin/adminLocal/ticket",
    icon: <IoTicketOutline />,
  },
  {
    id: 4,
    title: "Quản lí phòng",
    url: "/admin/adminLocal/room",
    icon: <MdOutlineChair />,
  },
  {
    id: 5,
    title: "Quản lí xuất chiếu",
    url: "/admin/adminLocal/showTime",
    icon: <MdAccessTime />,
  },
  {
    id: 6,
    title: "Quản lí rạp chiếu",
    url: "/admin/adminLocal/cinema",
    icon: <GiTheaterCurtains   />,
  },
];
export { links, linkLocal };
