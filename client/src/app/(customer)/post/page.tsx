"use client";

import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Offer from "@/components/Offer/Offer";
import React from "react";

const Post = () => {
  return (

    <>
      <BackgroundPage
        image="background_post.jpg"
        title="Khuyến mãi và Ưu đãi"
      ></BackgroundPage>
      <div className="container mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-background-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow pb-5"
            >
              <Offer />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;

