"use client";
import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Cinema } from "@/interfaces/cinema.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { useRouter, useSearchParams } from "next/navigation";
type FilterShowtimeProps = {
  cinemas: Cinema[];
  showtimes: { value: string; label: string }[];
  movies: MovieType[];
};
const FilterShowtime = ({
  cinemas,
  movies,
  showtimes,
}: FilterShowtimeProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("date") || showtimes[0].value;
  const selectedMovie = searchParams.get("movie") || "";
  const selectedCinema = searchParams.get("cinema") || "";

  const handleChangeDate = (date: string) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set("date", date);
    } else {
      params.delete("date");
    }
    router.push(`/showtimes?${params.toString()}`, { scroll: false });
  };
  const handleChangeMovie = (movie: string) => {
    const params = new URLSearchParams(searchParams);
    if (movie) {
      params.set("movie", movie);
    } else {
      params.delete("movie");
    }
    router.push(`/showtimes?${params.toString()}`, { scroll: false });
  };
  const handleChangeCinema = (cinema: string) => {
    const params = new URLSearchParams(searchParams);
    if (cinema) {
      params.set("cinema", cinema);
    } else {
      params.delete("cinema");
    }
    router.push(`/showtimes?${params.toString()}`, { scroll: false });
  };

  return (
    <SelectContainer>
      <SelectComponent
        leftIcon={<FaCalendarAlt className="text-foreground" size={20} />}
        getLabel={(item) => item.label}
        data={showtimes}
        defaultValue={selectedDate}
        getValue={(item) => item.value}
        onChange={handleChangeDate}
      />{" "}
      <SelectComponent
        leftIcon={<BiSolidMoviePlay className="text-foreground" size={20} />}
        getLabel={(item) => item.name}
        data={movies}
        defaultValue={selectedMovie}
        getValue={(item) => String(item._id)}
        onChange={handleChangeMovie}
        placeholder="Chọn phim"
      />{" "}
      <SelectComponent
        leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
        getLabel={(item) => item.name}
        data={cinemas}
        defaultValue={selectedCinema}
        getValue={(item) => item._id}
        onChange={handleChangeCinema}
        placeholder="Chọn rạp"
      />
    </SelectContainer>
  );
};

export default FilterShowtime;
