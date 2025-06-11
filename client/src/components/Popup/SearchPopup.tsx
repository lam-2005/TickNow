import React from "react";
import Image from "next/image";

const movies = [
  {
    id: 1,
    title: "Âm Dương Lộ",
    genre: "Kinh Dị, Tâm Linh",
    rating: 8.2,
    status: "ĐANG CHIẾU",
    image: "/movies/am-duong-lo.webp",
  },
  {
    id: 2,
    title: "Cuộc Xe Kinh Hoàng",
    genre: "Hành Động, Kịch Tính",
    rating: 7.8,
    status: "ĐANG CHIẾU",
    image: "/movies/cuoc-xe-kinh-hoang.webp",
  },
  {
    id: 3,
    title: "Đêm Thành Đôi Săn Quỷ",
    genre: "Kinh Dị, Hồi Hộp",
    rating: 9.1,
    status: "ĐANG CHIẾU",
    image: "/movies/dem-thanh-doi-san-quy.webp",
  },
  {
    id: 4,
    title: "Địa Đạo Mặt Trời Trong Bóng Tối",
    genre: "Lịch Sử, Hành Động",
    rating: 8.5,
    status: "ĐANG CHIẾU",
    image: "/movies/dia_dao_mat_troi_trong_bong_toi.webp",
  },
  {
    id: 5,
    title: "Minecraft",
    genre: "Hoạt Hình, Phiêu Lưu",
    rating: 9.0,
    status: "ĐANG CHIẾU",
    image: "/movies/minecraft.webp",
  },
  {
    id: 6,
    title: "Kayara",
    genre: "Hoạt Hình, Gia Đình",
    rating: 7.4,
    status: "ĐANG CHIẾU",
    image: "/movies/kayara.webp",
  },
  {
    id: 7,
    title: "Mật Vụ Phụ Hồ",
    genre: "Chiến Tranh, Hành Động",
    rating: 8.7,
    status: "ĐANG CHIẾU",
    image: "/movies/mat-vu-phu-ho.webp",
  },
  {
    id: 8,
    title: "Tà Thuật Huyết Ngãi",
    genre: "Kinh Dị, Huyền Bí",
    rating: 6.9,
    status: "ĐANG CHIẾU",
    image: "/movies/ta-thuat-huyet-ngai.webp",
  },
];
const SearchPopup = () => {
  return (
    <div className="relative z-50">
      <div className="w-[420px] bg-white shadow-2xl rounded-xl p-4 text-gray-800">
        <div className="text-xs text-gray-500 font-medium uppercase">Tìm kiếm gần đây</div>
        <div className="text-sm mt-1 mb-2">
          <span className="font-semibold" style={{ color: "#070707" }}>
            → Doraemon Movie 44: Nobita và Cuộc Phiêu...
          </span>
        </div>
        <div className="text-xs text-gray-500 font-medium uppercase mt-3">Phim đang chiếu</div>
        <div className="mt-2 flex flex-col gap-2 h-[500px] overflow-y-auto overflow-x-hidden max-h-[500px]">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex gap-3 p-2 border-b border-gray-200 last:border-none hover:bg-gray-50 rounded-md"
            >
              <div className="relative w-16 h-24 flex-shrink-0">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between text-sm">
                <p className="font-semibold leading-tight line-clamp-2" style={{ color: "#070707" }}>
                  {movie.title}
                </p><p className="text-xs text-gray-500 mt-1 line-clamp-1">{movie.genre}</p>
                <div className="flex items-center gap-2 text-xs mt-1">
                  {movie.rating && (
                    <span className="text-yellow-500 font-medium">⭐ {movie.rating}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;