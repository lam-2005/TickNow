"use client";
import React, { useEffect, useState } from "react";
import ShowtimeCard from "./ShowtimeCard";
import ShowtimeItem from "./ShowtimeItem";
import ShowType, { TimeScreening } from "./ShowType";
import BackgroundPage from "../BackgroundPage/BackgroundPage";
import { Cinema } from "@/interfaces/cinema.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { getMovieList } from "@/services/movie.service";
import LoadingSkeleton from "./LoadingSkeleton";
import FilterShowtime from "./FilterShowtime";
import { useRouter } from "nextjs-toploader/app";
import convertSlug from "@/utils/convertSlug";
type FilterShowtimeProps = {
  cinemas: Cinema[];
  showtimes: { value: string; label: string }[];
  movies: MovieType[];
};
type ShowtimeProps = {
  listFilter: FilterShowtimeProps;
};
const Showtimelist = ({ listFilter }: ShowtimeProps) => {
  const router = useRouter();
  const { cinemas, movies, showtimes } = listFilter;
  const [selectedDate, setSelectedDate] = useState(showtimes[0].value);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataShowtime, setDataShowtime] = useState<
    {
      film: MovieType;
      cinemas: Cinema[];
    }[]
  >([]);
  const getListShowtime = async (
    date: string,
    movie: string,
    cinema: string
  ) => {
    setLoading(true);
    try {
      const res = await getMovieList(
        `/schedue?date=${date}&movie=${movie}&cinema=${cinema}`
      );
      setDataShowtime(res?.data.data);
    } catch (error) {
      console.error("Không thể tải suất chiếu: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListShowtime(selectedDate, selectedMovie, selectedCinema);
  }, [selectedDate, selectedCinema, selectedMovie]);

  return (
    <>
      <BackgroundPage image="background_movie.webp" title="Lịch chiếu phim">
        <FilterShowtime
          cinemas={cinemas}
          movies={movies}
          showtimes={showtimes}
          selectedCinema={selectedCinema}
          selectedDate={selectedDate}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setSelectedCinema={setSelectedCinema}
          setSelectedDate={setSelectedDate}
        />
      </BackgroundPage>
      <div className="flex-column gap-7.5 mt-20 max-sm:mt-5">
        {loading ? (
          <LoadingSkeleton />
        ) : dataShowtime && dataShowtime.length > 0 ? (
          dataShowtime.map((item) => {
            const slugName = convertSlug(item.film.name);
            return (
              <ShowtimeCard
                key={item.film._id}
                title="Rạp chiếu"
                data={item.film}
                date={selectedDate}
              >
                {item.cinemas.map((cinema: any) => {
                  const sub =
                    cinema.showtimes?.filter(
                      (type: any) => type.showtype === 1
                    ) || [];
                  const dub =
                    cinema.showtimes?.filter(
                      (type: any) => type.showtype === 2
                    ) || [];

                  return (
                    <ShowtimeItem key={cinema.id} nameCinema={cinema.name}>
                      {sub.length > 0 && (
                        <ShowType type="Phụ đề">
                          {sub.map((time: any) => (
                            <TimeScreening
                              key={time.id}
                              value={time.time}
                              onClick={() =>
                                router.push(
                                  `/detail/${slugName}-${item.film._id}?date=${selectedDate}&location=${cinema.location.id_location}&showtime=${time.id}`
                                )
                              }
                            />
                          ))}
                        </ShowType>
                      )}
                      {dub.length > 0 && (
                        <ShowType type="Lồng tiếng">
                          {dub.map((time: any) => (
                            <TimeScreening
                              key={time.id}
                              value={time.time}
                              onClick={() =>
                                router.push(
                                  `/detail/${slugName}-${item.film._id}?date=${selectedDate}&location=${cinema.location.id_location}&showtime=${time.id}`
                                )
                              }
                            />
                          ))}
                        </ShowType>
                      )}
                    </ShowtimeItem>
                  );
                })}
              </ShowtimeCard>
            );
          })
        ) : (
          <p className="text-center bg-background-card w-[80%]  p-5 rounded-2xl container ">
            Không có suất chiếu nào vào ngày này
          </p>
        )}
      </div>
    </>
  );
};
export default Showtimelist;
