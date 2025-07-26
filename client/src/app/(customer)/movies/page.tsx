import { MovieType } from "@/interfaces/movie.interface";
import { getMovieList } from "@/services/movie.service";
import MovieList from "./MoviePageContainer/MovieList";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import { getCinemaList } from "@/services/cinema.service";
import FilterMovie from "./MoviePageContainer/FilterMovie";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}): Promise<Metadata> {
  const { status } = await searchParams;

  const isShowing = status === "dang-chieu" || !status;
  const title = isShowing ? "Phim đang chiếu tại rạp" : "Phim sắp chiếu";
  const description = isShowing
    ? "Khám phá các bộ phim đang chiếu mới nhất tại hệ thống rạp TickNow. Đặt vé nhanh chóng và tiện lợi."
    : "Xem trước các bộ phim sắp được công chiếu tại rạp. Đặt lịch và theo dõi ngay tại TickNow.";

  return {
    title,
    description,
  };
}

const getListCinema = async () => {
  const res = await getCinemaList();
  return res?.data.cinema;
};

const MovieSection = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    genre?: string;
    date?: string;
    cinema?: string;
  }>;
}) => {
  const { status, cinema, date } = await searchParams;
  const [resMovieShowing, cinemas] = await Promise.all([
    getMovieList(
      `${
        status && status === "dang-chieu"
          ? `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
          : status === "sap-chieu"
          ? "?status=2"
          : `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
      }`
    ),
    getListCinema(),
  ]);

  function getNext7DaysWithLabels() {
    const days = [];
    const today = new Date();
    today.setHours(today.getHours() + 7);
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      const value = d.toISOString().split("T")[0];

      days.push({ value, label });
    }

    return days;
  }
  const getDate = getNext7DaysWithLabels();
  const movies: MovieType[] = resMovieShowing?.data.movie;

  return (
    <>
      <BackgroundPage image="background_movie.webp" title="Phim chiếu rạp">
        {status !== "sap-chieu" && (
          <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
            <FilterMovie cinemas={cinemas} showtimes={getDate} />
          </div>
        )}
      </BackgroundPage>
      {movies.length > 0 ? (
        <MovieList data={movies} />
      ) : (
        <p className="text-center bg-background-card rounded-2xl container p-5 mt-20 w-4/5">
          Không có phim nào được chiếu
        </p>
      )}
    </>
  );
};

export default MovieSection;
