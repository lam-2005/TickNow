import Image from "next/image";
import React from "react";
const Offer = () => {
  return (
    <div className="w-full group">
      <div className="relative w-full aspect-[7/4] rounded-2xl overflow-hidden">
        <Image
          src={"/offers/offer.png"}
          fill
          alt="iimg"
          priority
          sizes="350px"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="px-2 mt-2 group-hover:text-primary">
        <time className="line-clamp-2 text-[clamp(0.75rem,2vw,0.875rem)] text-subtitle mb-1">
          01/01/2025
        </time>
        <h3 className="font-text font-bold capitalize line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo fugiat
          sapiente sed, perferendis repellendus quasi nisi blanditiis nam
          veritatis! Accusantium ab enim voluptatem assumenda, ea rem. Incidunt
          quis in quos.
        </h3>
      </div>
    </div>
  );
};

export default Offer;
