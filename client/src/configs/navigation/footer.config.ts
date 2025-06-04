import { FooterLinkType } from "@/interfaces/navigation.interface";

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
        url: "/privacypolicy",
        name: "Chính sách bảo mật",
      },
      {
        url: "/termsofuse",
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

export { footerLink };
