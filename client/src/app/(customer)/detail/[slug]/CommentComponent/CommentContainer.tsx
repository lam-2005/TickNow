import React from "react";
import { FaStar } from "react-icons/fa6";
import Comment from "./Comment";

const CommentContainer = () => {
  return (
    <div className="bg-background-card p-5 rounded-[10px]">
      <h2>Bình luận từ người xem</h2>
      <div className="w-full mt-2.5">
        <div className="flex gap-2.5 items-center">
          <span className="text-yellow-400 text-3xl">
            <FaStar />
          </span>
          <p>
            <span className="text-3xl font-bold">0.0</span>/5.0{"  "}
            <span className="text-sm">(0 Đánh giá)</span>
          </p>
        </div>
        <Comment />
      </div>
    </div>
  );
};

export default CommentContainer;
