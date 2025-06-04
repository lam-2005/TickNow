"use client";
import { useState } from "react";
import Movie from "@/components/Movie/Movie";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
import { FaFilm  } from "react-icons/fa";
import { FaCalendarAlt,FaSortAlphaDown  } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
const MovieSection = () => {
  const movies = [
    {
      id: 1,
      title: "QUỶ NHẬP TRÀNG",
      image: "quy_nhap_trang.jpg",
      date: "07.05.2025",
    },
    {
      id: 2,
      title: "ĐỊA ĐẠO",
      image: "dia_dao_mat_troi_trong_bong_toi.webp",
      date: "07.05.2025",
    },
    {
      id: 3,
      title: "GIA CỤC QUÂN SƯ",
      image: "phim_dien_anh_ninja_rantoro_k_giai_cuu_quan_su.webp",
      date: "28.03.2025",
    },
    {
      id: 4,
      title: "HUYẾT Á KỲ HẠNH",
      image: "huyet-an-truy-hanh_LT.webp",
      date: "28.03.2025",
    },
    {
      id: 5,
      title: "THIẾU NỮ ÁNH TRĂNG",
      image: "thieu-nu-anh-trang.webp",
      date: "28.03.2025",
    },
    {
      id: 6,
      title: "QUỶ NHẬP TRÀNG",
      image: "quy_nhap_trang.jpg",
      date: "07.05.2025",
    },
    {
      id: 7,
      title: "ĐỊA ĐẠO",
      image: "dia_dao_mat_troi_trong_bong_toi.webp",
      date: "07.05.2025",
    },
    {
      id: 8,
      title: "GIA CỤC QUÂN SƯ",
      image: "phim_dien_anh_ninja_rantoro_k_giai_cuu_quan_su.webp",
      date: "28.03.2025",
    },
    {
      id: 9,
      title: "HUYẾT Á KỲ HẠNH",
      image: "huyet-an-truy-hanh_LT.webp",
      date: "28.03.2025",
    },
    {
      id: 10,
      title: "THIẾU NỮ ÁNH TRĂNG",
      image: "thieu-nu-anh-trang.webp",
      date: "28.03.2025",
    },
  ];
  const [activeTab, setActiveTab] = useState("now");
  return (
    <div className="">
      <BackgroundPage image="background_movie.jpg" title="Lịch chiếu phim">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <Select>
            <SelectField icon={<FaCalendarAlt />} label="Chọn ngày chiếu" />
            <SelectField icon={<FaFilm  />} label="Chọn thể loại" />
            <SelectField icon={<RiMapPin2Fill />} label="Chọn rạp" />
          </Select>
        </div>
      </BackgroundPage>
      <div className="bg-black text-foreground px-6 py-12 mt-10 flex items-center justify-between">
      <div className="flex gap-6">
        <h1
          onClick={() => setActiveTab("now")}
          className={`cursor-pointer font-bold uppercase text-foreground border-b-2 ${
            activeTab === "now" ? "text-primary border-red-600" : "text-foreground border-transparent"
          }`}
        >
          PHIM ĐANG CHIẾU
        </h1>
        <h1
          onClick={() => setActiveTab("coming")}
          className={`cursor-pointer font-bold uppercase text-foreground border-b-2 ${
            activeTab === "coming" ? "text-primary border-red-600" : "text-foreground border-transparent"
          }`}
        >
          PHIM SẮP CHIẾU
        </h1>
      </div>
      <button className="flex items-center gap-2 border border-white py-2.5 px-5 rounded">
        <FaSortAlphaDown />
        <span className="text-foreground">Sắp xếp A–Z</span>
      </button>
    </div>
      <div className="container grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Movie key={movie.id} name={movie.title} image={movie.image} />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
