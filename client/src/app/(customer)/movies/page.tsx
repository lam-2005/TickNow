import { MovieType } from "@/interfaces/movie.interface";
import { getMovieList } from "@/services/movie.service";
import MovieList from "./MoviePageContainer/MovieList";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import { Screening } from "@/interfaces/screening.interface";
import { getScreeningList } from "@/services/screening.service";
import { getCinemaList } from "@/services/cinema.service";
import FilterMovie from "./MoviePageContainer/FilterMovie";
const getListDateShowtime = async () => {
  const res = await getScreeningList();
  return res.data.result;
};
const getListCinema = async () => {
  const res = await getCinemaList();
  return res.cinema;
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
  const [resMovieShowing, showtimes, cinemas] = await Promise.all([
    await getMovieList(
      `${
        status && status === "dang-chieu"
          ? `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
          : status === "sap-chieu"
          ? "?status=2"
          : `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
      }`
    ),
    getListDateShowtime(),
    getListCinema(),
  ]);

  const getDate = [
    ...new Set(showtimes.map((item: Screening) => item.date)),
  ].map((date) => {
    const d = new Date(date as string);
    const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    const label = `${weekday}, ${day}/${month}/${year}`;
    return {
      value: d.toISOString().split("T")[0],
      label: label,
    };
  });
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
