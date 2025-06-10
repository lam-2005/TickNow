"use client";
import { useState, useEffect } from "react";
import Movie from "@/components/Movie/Movie";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
import { FaFilm, FaCalendarAlt, FaSortAlphaDown } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { MovieType } from "@/interfaces/movie.interface";

const MovieSection = () => {
  const [activeTab, setActiveTab] = useState<"now" | "coming">("now");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (status: number) => {
    try {
      const res = await fetch(`http://localhost:5000/movies?_limit=10&status=${status}`);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Lỗi khi loading phim ...!", error);
    }
  };

  useEffect(() => {
    // 1 = đang chiếu, 2 = sắp chiếu
    const status = activeTab === "now" ? 1 : 2;
    fetchMovies(status);
  }, [activeTab]);

  return (
    <div>
      <BackgroundPage image="background_movie.jpg" title="Phim chiếu rạp">
        {activeTab === "now" && (
          <div className="absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
            <Select>
              <SelectField icon={<FaCalendarAlt />} label="Chọn ngày chiếu" />
              <SelectField icon={<FaFilm />} label="Chọn thể loại" />
              <SelectField icon={<RiMapPin2Fill />} label="Chọn rạp" />
            </Select>
          </div>
        )}
      </BackgroundPage>

      <div className="bg-black text-foreground container py-10 mt-10 flex items-center justify-between">
        <div className="flex gap-6">
          <h1
            onClick={() => setActiveTab("now")}
            className={`cursor-pointer font-bold uppercase text-foreground border-b-2 ${
              activeTab === "now"
                ? "text-primary border-red-600"
                : "text-foreground border-transparent"
            }`}
          >
            PHIM ĐANG CHIẾU
          </h1>
          <h1
            onClick={() => setActiveTab("coming")}
            className={`cursor-pointer font-bold uppercase text-foreground border-b-2 ${
              activeTab === "coming"
                ? "text-primary border-red-600"
                : "text-foreground border-transparent"
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
        {movies.map((movie: MovieType) => (
          <Movie key={movie.id} info={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
