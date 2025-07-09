"use client";
import React, { use } from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
import { PostType } from "@/interfaces/post.interface";
import Offer from "./Offer";
const OfferList = ({ data }: { data: Promise<PostType[]> }) => {
  const getMovie = use(data);
  return (
    <CustomSlider
      xl={4}
      lg={3}
      md={2}
      sm={2}
      slidesToShow={4}
      slidesToScroll={4}
    >
      {getMovie.map((item) => (
        <div className="px-2 " key={item._id}>
          <Offer data={item} />
        </div>
      ))}
    </CustomSlider>
  );
};

export default OfferList;
