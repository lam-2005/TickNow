"use client";
import { useState, useEffect, useCallback } from "react";
import Movie from "@/components/Movie/Movie";
import MovieLoading from "@/components/Loading/MovieLoading";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Select, { SelectField } from "@/components/Select/Select";
import { FaFilm, FaCalendarAlt, FaSortAlphaDown } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";
import Option from "@/components/Select/Option";

const MovieSection = () => {
  const [activeTab, setActiveTab] = useState<"now" | "coming">("now");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isActived, setIsActived] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleToggle = (id: string) => {
    setIsActived((prev) => (prev === id ? null : id));
  };

  const sortMovies = (movies: MovieType[], order: "asc" | "desc") => {
    return [...movies].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return order === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  };

  const handleToggleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setMovies((prevMovies) => sortMovies(prevMovies, newOrder));
  };

  const fetchMovies = useCallback(async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await movieService.getMovieList(`?status=${status}&limit=10`);
      const sorted = sortMovies(res?.data.movie || [], sortOrder);
      setMovies(sorted);
    } catch (error) {
      console.error("Lỗi khi tải phim:", error);
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    const status = activeTab === "now" ? "Đang Chiếu" : "Sắp Chiếu";
    fetchMovies(status);
  }, [activeTab, fetchMovies]);

  return (
    <div>
      <BackgroundPage image="background_movie.jpg" title="Phim chiếu rạp">
        {activeTab === "now" && (
          <div className="absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
            <Select>
              <SelectField
                icon={<FaCalendarAlt />}
                label="Hôm nay (27/05)"
                id="date"
                isOpen={isActived === "date"}
                onToggle={handleToggle}
              >
                <Option label="Chọn ngày chiếu" />
              </SelectField>
              <SelectField
                icon={<FaFilm />}
                label="Chọn thể loại"
                id="genre"
                isOpen={isActived === "genre"}
                onToggle={handleToggle}
              >
                <Option label="Chọn thể loại" />
              </SelectField>
              <SelectField
                icon={<RiMapPin2Fill />}
                label="Chọn rạp"
                id="cinema"
                isOpen={isActived === "cinema"}
                onToggle={handleToggle}
              >
                <Option label="Chọn rạp chiếu" />
              </SelectField>
            </Select>
          </div>
        )}
      </BackgroundPage>

      <div className="bg-background text-foreground container py-10 mt-10 flex items-center justify-between">
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
        <button
          onClick={handleToggleSort}
          className="flex items-center gap-2 border border-white py-2.5 px-5 rounded"
        >
          <FaSortAlphaDown />
          <span className="text-foreground">
            {sortOrder === "asc" ? "Sắp xếp A–Z" : "Sắp xếp Z–A"}
          </span>
        </button>
      </div>

      <div className="container">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : loading ? (
          <MovieLoading />
        ) : (
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ${
              activeTab === "coming" ? "text-white" : ""
            }`}
          >
            {movies.map((movie: MovieType) => (
              <Movie key={movie._id} info={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSection;
