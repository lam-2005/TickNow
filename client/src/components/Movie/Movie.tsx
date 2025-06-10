import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { ButtonInfo, ButtonPlay } from "../Button/ButtonOfItemMovie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TrailerPopup from "../Popup/TrailerPopup";
import { MovieType } from "@/interfaces/movie.interface";
const Movie = ({
  info,
  textColor,
}: {
  info: MovieType;
  textColor?: string;
}) => {
  const router = useRouter();
  const [openTrailer, setOpenTrailer] = useState<boolean>(false);
  return (
    <>
      {openTrailer && (
        <TrailerPopup
          name={info.name}
          url={info.trailer}
          onClose={() => setOpenTrailer(false)}
        />
      )}

      <div className="group w-full flex-column items-center gap-2.5">
        <div
          className="w-full aspect-[2/3] relative z-9 
      "
        >
          <Link href={"/detail"}>
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <Image
                fill
                src={`/movies/${info.image as string}`}
                alt="Phim"
                sizes="300px"
                className="object-cover 
            group-hover:scale-110 transition-transform duration-300 "
              />
            </div>
          </Link>
          <div className=" flex absolute -bottom-5 w-full justify-evenly z-10">
            <ButtonPlay onClick={() => setOpenTrailer(true)} />
            <ButtonInfo />
          </div>
        </div>
        <h3
          className={`font-semibold line-clamp-1 px-2.5 
      mt-4 ${textColor}`}
        >
          <Link
            href={"/detail"}
            className="group-hover:text-primary transition-colors duration-500 "
          >
            {info.name}
          </Link>
        </h3>
        <Button title="Đặt vé ngay" onClick={() => router.push("/detail")} />
      </div>
    </>
  );
};

export default Movie;
