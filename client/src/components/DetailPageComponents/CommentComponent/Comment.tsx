import React from "react";

const Comment = () => {
  return (
    <div className="space-y-2.5 mt-2.5">
      <div className="flex gap-5 items-center">
        <div className="size-11 rounded-full bg-amber-500"></div>
        <div className="">
          <div className="">Phan Phúc Lâm</div>
          <span className="text-xs">1 giờ trước</span>
        </div>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut fuga
        perspiciatis dolore nulla, cum iste, beatae voluptate culpa eius,
        delectus consequatur expedita voluptatem dolores accusantium? Itaque
        dolore voluptatibus nostrum quibusdam.
      </p>
    </div>
  );
};

export default Comment;
