import { MovieType } from "@/interfaces/movie.interface";
import Image from "next/image";
import React from "react";
import MovieList from "./MovieList";
import { Cinema } from "@/interfaces/cinema.interface";
import CinemaList from "./CinemaList";

const BotMessage = ({
  messages,
  data,
}: {
  messages: string[];
  data?: {
    movie: MovieType[];
    cinema: Cinema[];
  };
}) => {
  const message = messages[0];
  return (
    <div className=" flex gap-4">
      <div className="w-10 h-10 bg-white flex-center border-black/10 border flex-shrink-0 rounded-full self-end">
        <Image src={"/logo/logoT.webp"} alt="logo" width={20} height={20} />
      </div>
      <div className="flex-column gap-2 w-full">
        {message !== "undefined" ? (
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            className="text-background text-sm max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 
                       break-words whitespace-pre-line [&_a]:text-primary [&_a]:underline"
          />
        ) : (
          <></>
        )}
        {data && data?.movie && data.movie.length > 0 && (
          <MovieList data={data.movie} />
        )}
        {data && data?.cinema && data.cinema.length > 0 && (
          <CinemaList cinemas={data.cinema} />
        )}
      </div>
    </div>
  );
};

export default BotMessage;
