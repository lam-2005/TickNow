"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Comment from "./Comment";
import { MovieType } from "@/interfaces/movie.interface";
import Button from "@/components/Button/Button";

type CommentContainerProps = {
  rate: {
    data: any[];
    pagination: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  };
  movie: MovieType;
};

const showCmt = 5;
const CommentContainer: React.FC<CommentContainerProps> = ({ rate, movie }) => {
  const [visibleCount, setVisibleCount] = useState(showCmt);
  const hasData = rate.data.length > 0;
  const rateHasCmt = rate.data
    .filter((comment) => comment.comment && comment.comment.trim() !== "")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  const collapse = visibleCount >= rateHasCmt.length;

  const handleToggle = () => {
    if (collapse) {
      setVisibleCount(showCmt);
    } else {
      setVisibleCount((prev) => prev + showCmt);
    }
  };

  return (
    <div className="bg-background-card p-5 rounded-[10px]">
      <h2 className="text-2xl font-semibold mb-2 ">Bình luận từ người xem</h2>

      {hasData ? (
        <div className="w-full">
          <div className="flex gap-2.5 items-center mb-1">
            <span className="text-yellow-400 text-3xl">
              <FaStar />
            </span>
            <p>
              <span className="text-3xl font-bold">{movie.star}</span>/5.0{" "}
              <span className="text-sm text-gray-500">
                ({rate.data.length} Đánh giá)
              </span>
            </p>
          </div>

          <div className="flex flex-col [&>div]:not-last:pb-3.5 [&>div]:not-last:border-b [&>div]:not-last:border-b-stone-700">
            {rateHasCmt.length > 0 ? (
              rateHasCmt
                .slice(0, visibleCount)
                .map((comment) => <Comment key={comment._id} data={comment} />)
            ) : (
              <p className="text-center py-3">Chưa có bình luận nào</p>
            )}
          </div>

          {rateHasCmt.length > showCmt && (
            <div className="flex-center mt-4">
              <Button
                onClick={handleToggle}
                className="w-fit"
                title={`${collapse ? "Thu gọn" : "Xem thêm"}`}
                btnSecondary
              ></Button>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-300">
          Hiện chưa có bình luận nào. Hãy trải nghiệm phim để là người đầu tiên
          bình luận trên TickNow.
        </p>
      )}
    </div>
  );
};

export default CommentContainer;
