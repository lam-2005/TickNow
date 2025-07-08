import { TfiDashboard } from "react-icons/tfi";
import { FaRegStar, FaRegUser } from "react-icons/fa6";
import { TbBrandCarbon } from "react-icons/tb";
import { MdOutlineLocalOffer } from "react-icons/md";
import { ReactNode } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { IoTicketOutline, IoTimeOutline } from "react-icons/io5";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { RiArticleLine } from "react-icons/ri";
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
    url: "/admin",
    icon: <TfiDashboard />,
  },

  {
    id: 6,
    title: "Phim chiếu",
    url: "/admin/movie",
    icon: <PiFilmSlateDuotone />,
  },
  {
    id: 3,
    title: "Rạp chiếu",
    url: "/admin/cinema",
    icon: <TbBrandCarbon />,
  },
  {
    id: 4,
    title: "Suất chiếu",
    url: "/admin/showtime",
    icon: <IoTimeOutline />,
  },
  {
    id: 7,
    title: "Phòng chiếu",
    url: "/admin/room",
    icon: <SiGoogleclassroom />,
  },
  {
    id: 2,
    title: "Người dùng",
    url: "/admin/user",
    icon: <FaRegUser />,
  },
  {
    id: 9,
    title: "Đặt vé",
    url: "/admin/booking",
    icon: <IoTicketOutline />,
  },
  {
    id: 8,
    title: "Đánh giá",
    url: "/admin/rating",
    icon: <FaRegStar />,
  },
  {
    id: 5,
    title: "Khuyến mãi",
    url: "/admin/vouchers",
    icon: <MdOutlineLocalOffer />,
  },

  {
    id: 10,
    title: "Bài viết",
    url: "/admin/post",
    icon: <RiArticleLine />,

  },
];

export { links };
