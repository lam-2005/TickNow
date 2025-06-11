import Image from "next/image";
import React from "react";
const Offer = () => {
  return (
    <div className="w-full group rounded-2xl dark:bg-transparent dark:shadow-none">
      <div className="relative w-full aspect-[7/4] overflow-hidden rounded-2xl">
        <Image
          src={"/offers/offer.webp"}
          fill
          alt=""
          priority
          sizes="350px"
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="px-4 mt-2 group-hover:text-primary">
        <time className="line-clamp-2 text-[clamp(0.75rem,2vw,0.875rem)] text-foreground mb-1">
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
