import React from "react";
const listPrompts = [
  "Làm thế nào để đặt vé xem phim?",
  "Có chương trình khuyến mãi nào không?",
  "Lịch chiếu phim mới nhất hôm nay?",
  "Phim nào đang hot tuần này?",
];
const ListPrompt = ({
  onSelectPrompt,
}: {
  onSelectPrompt: (prompt: string) => void;
}) => {
  return (
    <div className="p-4 flex gap-4 w-full overflow-x-auto overflow-y-hidden pb-6">
      {listPrompts.map((prompt, index) => (
        <p
          key={index}
          onClick={() => onSelectPrompt(prompt)}
          className="text-background text-sm h-fit p-2.5 bg-black/10 w-fit rounded-full py-1.5 text-nowrap cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
        >
          {prompt}
        </p>
      ))}
    </div>
  );
};

export default ListPrompt;
