import { commentTime } from "@/utils/timeComment";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Comment = ({ data }: { data: any }) => {
  return (
    <div className="space-y-2.5 mt-2.5">
      <div className="flex gap-5 items-center">
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
      <p>{data?.comment}</p>
    </div>
  );
};

export default Comment;
