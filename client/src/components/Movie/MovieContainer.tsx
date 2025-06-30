"use client";
import React, { use } from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
import { MovieType } from "@/interfaces/movie.interface";
import Movie from "./Movie";
const MovieContainer = ({
  data,
  textColor,
}: {
  data: Promise<MovieType[]>;
  textColor?: string;
}) => {
  const getMovie = use(data);
  return (
    <CustomSlider xl={4} lg={3} md={2} sm={2}>
      {getMovie.map((item: MovieType) => (
        <div className="px-2 " key={item._id}>
          <Movie info={item} textColor={textColor} />
        </div>
      ))}
    </CustomSlider>
  );
};

export default MovieContainer;
