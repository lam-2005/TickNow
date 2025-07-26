"use client";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Cinema } from "@/interfaces/cinema.interface";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
type FilterMovierops = {
  cinemas: Cinema[];
  showtimes: { value: string; label: string }[];
};
const FilterMovie = ({ cinemas, showtimes }: FilterMovierops) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("date") || "";
  const selectedCinema = searchParams.get("cinema") || "";

  const handleChangeDate = (date: string) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set("date", date);
    } else {
      params.delete("date");
    }
    router.push(`/movies?${params.toString()}`, { scroll: false });
  };
  const handleChangeCinema = (cinema: string) => {
    const params = new URLSearchParams(searchParams);
    if (cinema) {
      params.set("cinema", cinema);
    } else {
      params.delete("cinema");
    }
    router.push(`/movies?${params.toString()}`, { scroll: false });
  };

  return (
    <SelectContainer>
      <SelectComponent
        leftIcon={<FaCalendarAlt className="text-foreground" />}
        getLabel={(item) => item.label}
        data={showtimes}
        defaultValue={selectedDate}
        getValue={(item) => item.value}
        onChange={handleChangeDate}
        placeholder="Chọn ngày chiếu"
      />
      <SelectComponent
        leftIcon={<RiMapPin2Fill className="text-foreground" />}
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

export default FilterMovie;
