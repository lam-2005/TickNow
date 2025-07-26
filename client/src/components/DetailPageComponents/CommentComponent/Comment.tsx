import { commentTime } from "@/utils/timeComment";
import React from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
const labels: { [index: string]: string } = {
  0: "Chưa đánh giá",
  0.5: "Rất tệ",
  1: "Tệ",
  1.5: "Chán",
  2: "Tạm",
  2.5: "Ổn",
  3: "Hay",
  3.5: "Rất hay",
  4: "Tuyệt",
  4.5: "Rất tuyệt",
  5: "Siêu phẩm",
};

const Comment = ({ data }: { data: any }) => {
  return (
    <div className="space-y-2 mt-2.5">
      <div className="flex gap-3 items-center">
        <div className="size-11 rounded-full">
          <div className="flex-center">
            <FaUserCircle className="size-full" />
          </div>
        </div>
        <div className="">
          <div className="">{data?.user?.name}</div>

          <span className="text-xs">
            {data?.updatedAt ? commentTime(data.updatedAt) : ""}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <FaStar className="text-base text-yellow-400" />
        {data.score.toFixed(1)}/5.0 - {labels[data.score]}
      </div>
      <p>{data?.comment}</p>
    </div>
  );
};

export default Comment;
