import Movie from "@/components/Movie/Movie";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";

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

  return (
    <div className="">
      <BackgroundPage title="Lịch chiếu phim" image="background_movie.jpg" />
      <div className="flex gap-8 mb-4 container ">
        <h1 className="text-primary text-xl">PHIM ĐANG CHIẾU</h1>
        <h1 className="text-foreground text-xl">PHIM SẮP CHIẾU</h1>
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
