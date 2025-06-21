"use client";

import React from "react";
import Link from "next/link";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Offer from "@/components/Offer/Offer";

const Post = () => {
  return (
    <>
      <BackgroundPage
        image="postdetail.webp"
        title="Khuyến mãi và Ưu đãi"
      />
      <div className="container mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Link
              href="/post/post-detail"
              key={index}
              className="bg-background-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow pb-5 block"
            >
              <Offer />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
