import React from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
import { MovieType } from "@/interfaces/movie.interface";
import Movie from "./Movie";
const MovieContainer = ({
  data,
  textColor,
}: {
  data: MovieType[];
  textColor?: string;
}) => {
  return (
    <CustomSlider xl={4} lg={3} md={2} sm={2}>
      {data.map((item: MovieType, index: number) => (
        <div
          className="px-2 "
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(index + 1) * 100}
        >
          <Movie
            name={item.name}
            image={item.image as string}
            textColor={textColor}
          />
        </div>
      ))}
    </CustomSlider>
  );
};

export default MovieContainer;
