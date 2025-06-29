"use client";
import { useState, useEffect, useCallback } from "react";
import Movie from "@/components/Movie/Movie";
import MovieLoading from "@/components/Loading/MovieLoading";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
// import Select, { SelectField } from "@/components/Select/Select";
import { FaCalendarAlt, FaSortAlphaDown } from "react-icons/fa";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";
import { Screening } from "@/interfaces/screening.interface";
import { Cinema } from "@/interfaces/cinema.interface";
import { getScreeningList } from "@/services/screening.service";
import { getCinemaList } from "@/services/cinema.service";
import { getGenreList } from "@/services/genre.service";
import Genre from "@/interfaces/genre.interface";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
const MovieSection = () => {
  const [activeTab, setActiveTab] = useState<"now" | "coming">("now");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [showtimes, setShowtimes] = useState<Screening[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [selectedDate, setSelectedDate] = useState<
    { value: string; label: string } | ""
  >("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "">("");
  const [selectedCinema, setSelectedCinema] = useState<Cinema | "">("");

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

  const handleGetCinema = (cinemaId: any) => {
    setSelectedCinema(cinemaId);
  };
  const handleGetGenre = (genreId: any) => {
    setSelectedGenre(genreId);
  };
  const handleGetDate = (date: any) => {
    setSelectedDate(date);
  };
  console.log("Selected Date:", selectedDate);
  console.log("Selected Genre:", selectedGenre);
  console.log("Selected Cinema:", selectedCinema);

  // dữ liệu suất
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const res = await getScreeningList();
        console.log(res.data);
        setShowtimes(res?.data);
      } catch (error) {
        console.error("Lỗi khi tải suất chiếu:", error);
      }
    };
    fetchShowtimes();
  }, []);
  // dữ liệu rạp
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await getCinemaList();
        console.log(res.cinema);
        setCinemas(res?.cinema);
      } catch (error) {
        console.error("Lỗi khi tải rạp:", error);
      }
    };
    fetchCinemas();
  }, []);
  //dự liệu thể Loại
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenreList();
        console.log(res.genres);

        setGenres(res?.genres || []);
      } catch (error) {
        console.error("Lỗi khi tải thể loại:", error);
      }
    };
    fetchGenres();
  }, []);
  // dữ liệu phim
  const fetchMovies = useCallback(
    async (status: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await movieService.getMovieList(
          status === 2
            ? `?status=2`
            : selectedDate
            ? `/filter?status=1&date=${selectedDate?.value}&cinema=${
                selectedCinema ? selectedCinema?._id : ""
              }&genre=${selectedGenre ? selectedGenre._id : ""}`
            : "?status=1"
        );
        const sorted = sortMovies(res?.data.movie || [], sortOrder);
        setMovies(sorted);
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    },
    [sortOrder, selectedDate, selectedGenre, selectedCinema]
  );

  useEffect(() => {
    const status = activeTab === "now" ? 1 : 2;
    fetchMovies(status);
  }, [activeTab, fetchMovies]);
  const [openId, setOpenId] = useState<string | null>(null);
  if (!cinemas) return <p>loading...</p>;
  if (!genres) return <p>loading...</p>;
  if (!showtimes) return <p>loading...</p>;
  console.log(cinemas);
  const getDate = [...new Set(showtimes.map((item) => item.date))].map(
    (date) => {
      const d = new Date(date);
      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      return {
        value: d.toISOString().split("T")[0],
        label: label,
      };
    }
  );
  console.log(getDate);

  return (
    <div>
      <BackgroundPage image="background_movie.jpg" title="Phim chiếu rạp">
        {activeTab === "now" && (
          <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
            {/* <Select>
              <SelectField
                icon={<FaCalendarAlt />}
                id="date"
                openId={openId}
                setOpenId={setOpenId}
                data={getDate}
                getOptionLabel={(item) => item.label}
                getOptionValue={(item) => item.value}
                defaultSelected={null}
                placeholder="Chọn ngày chiếu"
                valueSelect={handleGetDate}
              />
              <SelectField
                icon={<BiCategoryAlt />}
                id="genres"
                openId={openId}
                setOpenId={setOpenId}
                data={genres}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item._id}
                defaultSelected={null}
                placeholder="Chọn thể loại"
                valueSelect={handleGetGenre}
              />
              <SelectField
                icon={<IoMdPin />}
                id="cinema"
                openId={openId}
                setOpenId={setOpenId}
                data={cinemas}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item._id}
                defaultSelected={null}
                placeholder="Chọn rạp chiếu"
                valueSelect={handleGetCinema}
              />
            </Select> */}
          </div>
        )}
      </BackgroundPage>

      <div className="text-foreground container py-10 mt-10 flex items-center justify-between">
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
        ) : movies.length > 0 ? (
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ${
              activeTab === "coming" ? "text-white" : ""
            }`}
          >
            {movies.map((movie: MovieType) => (
              <Movie key={movie._id} info={movie} />
            ))}
          </div>
        ) : (
          <p>Không tìm thấy phim</p>
        )}
      </div>
    </div>
  );
};

export default MovieSection;
