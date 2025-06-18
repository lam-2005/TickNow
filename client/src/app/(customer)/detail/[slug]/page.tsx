"use client";
import { ButtonPlay } from "@/components/Button/ButtonOfItemMovie";
import TrailerPopup from "@/components/Popup/TrailerPopup";
// import Select, { SelectField } from "@/components/Select/Select";
import { ShowType } from "@/components/ShowtimeList/ShowtimeCard";
import env from "@/configs/environment";
import { useTheme } from "@/hooks/contexts/useTheme";
import usePopup from "@/hooks/usePopup";
import { MovieType } from "@/interfaces/movie.interface";
import { getMovieList } from "@/services/movie.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { FaCalendarAlt } from "react-icons/fa";
// import { RiMapPin2Fill } from "react-icons/ri";
const CinemaShowtime = () => {
  return (
    <div className="space-y-5 bg-background-card rounded-[10px] p-5 w-full">
      <div className="w-full">
        <h2>TickNow Quận 12 (Thành Phố Hồ Chí Minh)</h2>
      </div>
      <div className="space-y-5">
        <p>123 Tô Ký, Phường Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh</p>
        <ShowType type="Phụ đề" />
        <ShowType type="Lồng tiếng" />
      </div>
    </div>
  );
};

const Movie = () => {
  const { trailerPopup, openTrailer, closeTrailer } = usePopup();
  const { theme } = useTheme();
  const [movie, setMovie] = useState<MovieType | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await getMovieList(`/${slug}`);
      // console.log(res);

      setMovie(res?.data);
    };
    getData();
  }, [slug]);
  if (!movie) return <p>Loading...</p>;
  // console.log(movie);
  const date = new Date(movie.release_date);
  const formatDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("vi-VN")
    : "Đang Cập Nhật";
  return (
    <div>
      {trailerPopup && (
        <TrailerPopup
          name={movie.name}
          url={movie.trailer}
          onClose={closeTrailer}
        />
      )}
      {/* Banner */}
      <div className="relative w-screen max-h-[500px] h-full aspect-video text-white">
        <div className="bg-amber-300 w-full h-full brightness-50 relative">
          {" "}
          <Image
            src={`${env.IMG_API_URL}/banner/${movie.banner}`}
            alt={movie.name}
            fill
            priority
            sizes="1280px"
            className="object-cover
            "
          />
          <div
            aria-hidden="true"
            className={`${
              theme === "dark"
                ? "bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)] "
                : " "
            } bottom-0 Z-1000 w-full h-1/2 absolute`}
          ></div>
        </div>
        <div className="container flex gap-[25px] w-full absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="relative max-w-[204px] max-h-[300px] aspect-[2/3] w-full bg-red-400 rounded-[15px]">
            <Image
              src={`${env.IMG_API_URL}/movie/${movie.image}`}
              alt={movie.name}
              fill
              priority
              sizes="1280px"
              className="object-cover
            "
            />
            <ButtonPlay
              onClick={openTrailer}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <h1>{movie.name}</h1>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                {movie.age}+
              </span>
            </div>

            <div className="flex gap-5 [&_div]:not-first:before:w-px [&_div]:not-first:before:h-[12px] [&_div]:not-first:before:bg-white [&_div]:not-first:before:absolute [&_div]:not-first:relative [&_div]:not-first:before:-left-2.5 [&_div]:not-first:before:top-1/2 [&_div]:not-first:before:-translate-y-1/2">
              <div>0.0/10</div>
              <div>{movie.duration} phút</div>
              <div>
                {movie.genre
                  .map((item) => {
                    return item.name;
                  })
                  .join(", ")}
              </div>
              <div>{date.getFullYear()}</div>
            </div>

            <p className="line-clamp-2 text-white">{movie.description}</p>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Công chiếu</strong>
              <span className="text-white">{formatDate}</span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Đạo diễn</strong>
              <span className="text-white">
                {movie.director || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Diễn viên</strong>
              <span className="text-white">
                {movie.actor || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Ngôn ngữ</strong>
              <span className="text-white">{"Đang cập nhật"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10 space-y-10">
        <div className="flex-column items-center gap-7.5">
          <h1>Lịch chiếu phim</h1>
          {/* <Select>
            <SelectField icon={<FaCalendarAlt />} label="Hôm nay (27/05)" />
            <SelectField
              icon={<RiMapPin2Fill />}
              label="Thành phố Hồ Chí Minh"
            />
          </Select> */}
        </div>
        <div className="flex-column items-center gap-7.5">
          <h1>Danh sách rạp</h1>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            <CinemaShowtime />
            <CinemaShowtime />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
