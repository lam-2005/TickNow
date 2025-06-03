"use client";
import Offer from "@/components/Offer/Offer";
import React from "react";

const Post = () => {
  return (
    <div className="min-h-screen px-6 py-6 pb-5 max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Khuyến mãi</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-background-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Offer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;