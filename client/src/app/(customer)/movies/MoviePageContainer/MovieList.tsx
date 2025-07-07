"use client";
import Movie from "@/components/Movie/Movie";
import { MovieType } from "@/interfaces/movie.interface";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const MovieList = ({ data }: { data: MovieType[] }) => {
  const [sortOrder, setSortOrder] = useState<boolean>(false);
  const sortedMovies = [...data].sort((a, b) => {
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    return sortOrder ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
  });
  const handleSortMovie = () => {
    setSortOrder(!sortOrder);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const getStatusParams = searchParams.get("status") || "";
  const handleChangeStatus = (status: number) => {
    const params = new URLSearchParams(searchParams);
    if (status === 1) {
      params.set("status", "dang-chieu");
    } else if (status === 2) {
      params.delete("date");
      params.delete("cinema");
      params.set("status", "sap-chieu");
    }
    router.push(`/movies?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      <div className="container space-y-10 mt-20">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <h1
              onClick={() => handleChangeStatus(1)}
              className={`cursor-pointer font-bold uppercase text-3xl text-foreground border-b-4 ${
                getStatusParams === "" || getStatusParams === "dang-chieu"
                  ? "text-primary border-red-600"
                  : "text-foreground border-transparent"
              }`}
            >
              PHIM ĐANG CHIẾU
            </h1>
            <h1
              onClick={() => handleChangeStatus(2)}
              className={`cursor-pointer font-bold uppercase text-3xl text-foreground border-b-4 ${
                getStatusParams === "sap-chieu"
                  ? "text-primary border-red-600"
                  : "text-foreground border-transparent"
              }`}
            >
              PHIM SẮP CHIẾU
            </h1>
          </div>
          <button
            onClick={handleSortMovie}
            className="group flex rounded-[5px] items-center gap-2 border-2 border-white py-2.5 px-5 hover:border-primary hover:text-primary transition-colors text-foreground"
          >
            {sortOrder ? (
              <>
                <FaSortAlphaDown /> A-Z
              </>
            ) : (
              <>
                <FaSortAlphaUp /> Z-A
              </>
            )}
          </button>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {sortedMovies.map((movie) => (
            <Movie key={movie._id} info={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
