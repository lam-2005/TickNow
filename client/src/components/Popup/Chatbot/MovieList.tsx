import { MovieType } from "@/interfaces/movie.interface";
import React, { useState } from "react";
import convertSlug from "@/utils/convertSlug";
import Link from "next/link";
import Image from "next/image";
import env from "@/configs/environment";
const MovieList = ({ data }: { data: MovieType[] }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (data.length === 1)
    return (
      <>
        <div className="max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 ">
          <div className="w-full aspect-[2/3] relative z-9 max-w-[150px] rounded-lg overflow-hidden bg-loading left-1/2 -translate-x-1/2">
            <Image
              fill
              src={`${env.IMG_API_URL}${data[0].image}`}
              alt={data[0].name}
              sizes="300px"
              className="object-cover 
                    group-hover:scale-110 transition-transform duration-300 "
            />
          </div>
          <div className="*:text-background *:text-sm *:break-words *:whitespace-pre-line mt-2 space-y-1">
            <p className="font-bold text-lg!">{data[0].name}</p>
            <p>
              <strong>Thể loại: </strong>{" "}
              {(data[0].genre.length > 0 &&
                data[0].genre.map((item) => item.name).join(", ")) ||
                "Đang cập nhật"}
            </p>
            <p>
              <strong>Ngôn ngữ: </strong>
              {data[0].language || "Đang cập nhật"}
            </p>
            <p>
              <strong>Quốc gia: </strong>
              {data[0].nation || "Đang cập nhật"}
            </p>
            <p>
              <strong>Đạo diễn: </strong>
              {data[0].director || "Đang cập nhật"}
            </p>
            <p>
              <strong>Diễn viên: </strong>
              {data[0].actor || "Đang cập nhật"}
            </p>
            <p>
              <strong>Thời lượng: </strong>
              {`${data[0].duration} phút` || "Đang cập nhật"}
            </p>

            <div className="">
              <p
                className={`text-background text-sm ${
                  showFullDescription ? "" : "line-clamp-5 md:line-clamp-3"
                }`}
              >
                <strong>Mô tả: </strong>{" "}
                {data[0].description || "Đang cập nhật"}
              </p>
              {data[0].description && data[0].description.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary! underline text-sm"
                >
                  {showFullDescription ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </div>
          </div>
        </div>
        <Link
          href={`/detail/${convertSlug(data[0].name)}-${data[0]._id}`}
          className="text-background hover:text-primary font-bold text-sm max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 "
        >
          Đặt vé tại đây
        </Link>
      </>
    );
  return (
    <ol className="list-decimal list-inside mt-2 max-w-[90%] w-fit rounded-xl bg-black/10 p-2.5 space-y-4">
      {data.map((movie) => (
        <li key={movie._id} className="">
          <Link
            href={`/detail/${convertSlug(movie.name)}-${movie._id}`}
            className=" hover:underline hover:text-blue-500 text-background text-sm break-words whitespace-pre-line "
          >
            {movie.name}
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default MovieList;
