import React from "react";
import { FaStar } from "react-icons/fa6";
import Comment from "./Comment";
import { MovieType } from "@/interfaces/movie.interface";
const CommentContainer = ({
  rate,
  movie,
}: {
  rate: {
    data: any;
    pagination: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  };
  movie: MovieType;
}) => {
  const getComment = rate.data.filter((comment: any) => comment.comment !== "");

  return (
    <div className="bg-background-card p-5 rounded-[10px]">
      <h2>Bình luận từ người xem</h2>
      <div className="w-full mt-2.5">
        <div className="flex gap-2.5 items-center">
          <span className="text-yellow-400 text-3xl">
            <FaStar />
          </span>
          <p>
            <span className="text-3xl font-bold">{movie.star}</span>/5.0{"  "}
            <span className="text-sm">({rate.data.length} Đánh giá)</span>
          </p>
        </div>
        <div className="flex-column gap-5">
          {getComment.length > 0 ? (
            getComment
              .sort(
                (a: any, b: any) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .map((comment: any) => (
                <Comment key={comment._id} data={comment} />
              ))
          ) : (
            <p className="text-center">Chưa có bình luận nào</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;
