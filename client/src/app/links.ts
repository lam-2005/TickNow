// header
export interface LinkNavbarType {
  id: number;
  url: string;
  name: string;
}
const linkNavbar: LinkNavbarType[] = [
  { id: 1, url: "/", name: "Trang chủ" },
  { id: 2, url: "/movies", name: "Phim chiếu" },
  { id: 3, url: "/movie-schedule", name: "Lịch chiếu" },
  { id: 4, url: "/cinema", name: "Rạp chiếu" },
];

// footer
export interface FooterLinkType {
  id: number;
  title: string;
  children: childrenFooterLinkType[];
}
export interface childrenFooterLinkType {
  url: string;
  name: string;
}
const footerLink: FooterLinkType[] = [
  {
    id: 1,
    title: "ticknow",
    children: [
      {
        url: "/#",
        name: "Về chúng tôi",
      },
      {
        url: "/#",
        name: "Liên hệ",
      },
    ],
  },
  {
    id: 4,
    title: "mua vé xem phim",
    children: [
      {
        url: "/#",
        name: "Lịch chiếu phim",
      },
      {
        url: "/#",
        name: "Rạp chiếu phim",
      },
      {
        url: "/#",
        name: "Phim chiếu rạp",
      },
    ],
  },
  {
    id: 2,
    title: "điều khoản dịch vụ",
    children: [
      {
        url: "/#",
        name: "Chính sách bảo mật",
      },
      {
        url: "/#",
        name: "Điều khoản sử dụng",
      },
    ],
  },
  {
    id: 3,
    title: "hỗ trợ khách hàng",
    children: [
      {
        url: "/#",
        name: "Góp ý",
      },
      {
        url: "/#",
        name: "Hỏi đáp",
      },
    ],
  },
];

export { linkNavbar, footerLink };
