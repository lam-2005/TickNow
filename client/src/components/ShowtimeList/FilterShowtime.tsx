import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Cinema } from "@/interfaces/cinema.interface";
import { MovieType } from "@/interfaces/movie.interface";
type FilterShowtimeProps = {
  cinemas: Cinema[];
  showtimes: { value: string; label: string }[];
  movies: MovieType[];
  selectedDate: string;
  setSelectedDate: (data: string) => void;
  selectedMovie: string;
  setSelectedMovie: (data: string) => void;
  selectedCinema: string;
  setSelectedCinema: (data: string) => void;
};
const FilterShowtime = ({
  cinemas,
  movies,
  showtimes,
  selectedDate,
  setSelectedDate,
  selectedMovie,
  setSelectedMovie,
  selectedCinema,
  setSelectedCinema,
}: FilterShowtimeProps) => {
  return (
    <SelectContainer>
      <SelectComponent
        leftIcon={<FaCalendarAlt className="text-foreground" />}
        getLabel={(item) => item.label}
        data={showtimes}
        defaultValue={selectedDate}
        getValue={(item) => item.value}
        onChange={(date) => setSelectedDate(date)}
      />{" "}
      <SelectComponent
        leftIcon={<BiSolidMoviePlay className="text-foreground" />}
        getLabel={(item) => item.name}
        data={movies}
        defaultValue={selectedMovie}
        getValue={(item) => String(item._id)}
        onChange={(movie) => setSelectedMovie(movie)}
        placeholder="Chọn phim"
      />{" "}
      <SelectComponent
        leftIcon={<RiMapPin2Fill className="text-foreground" />}
        getLabel={(item) => item.name}
        data={cinemas}
        defaultValue={selectedCinema}
        getValue={(item) => item._id}
        onChange={(cinema) => setSelectedCinema(cinema)}
        placeholder="Chọn rạp"
      />
    </SelectContainer>
  );
};

export default FilterShowtime;
