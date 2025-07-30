import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import { getCinemaList } from "@/services/cinema.service";
import FilterMovie from "./MoviePageContainer/FilterMovie";
import { Metadata } from "next";
import { Suspense } from "react";
import MovieListServer from "./MoviePageContainer/MovieListServer";
import { SkeletonLoading } from "@/components/Loading/MovieLoading";
import TabMovie from "./MoviePageContainer/TabMovie";

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
    date?: string;
    cinema?: string;
  }>;
}) => {
  const { status, cinema, date } = await searchParams;
  const [cinemas] = await Promise.all([
    // getMovieList(
    //   `${
    //     status && status === "dang-chieu"
    //       ? `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
    //       : status === "sap-chieu"
    //       ? "?status=2"
    //       : `/filter?status=1&date=${date || ""}&cinema=${cinema || ""}`
    //   }`
    // ),
    getListCinema(),
  ]);

  function getNext7DaysWithLabels() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      const value = `${year}-${month}-${day}`;

      days.push({ value, label });
    }

    return days;
  }
  const getDate = getNext7DaysWithLabels();
  // const movies: MovieType[] = resMovieShowing?.data.movie;
  const suspenseKey = `${status}-${cinema}-${date}`;
  return (
    <>
      <BackgroundPage image="background_movie.webp" title="Phim chiếu rạp">
        {status !== "sap-chieu" && (
          <FilterMovie cinemas={cinemas} showtimes={getDate} />
        )}
      </BackgroundPage>
      <div className="container mt-20 max-sm:mt-5">
        <TabMovie />
        <Suspense
          key={suspenseKey}
          fallback={
            <div className="grid container grid-cols-5 gap-5 mt-5 max-sm:mt-5">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          }
        >
          <MovieListServer searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default MovieSection;
