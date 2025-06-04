"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { ReviewType } from "@/interfaces/rating.interface";

const UserManagement = () => {
  const rating: ReviewType[] = [
    {
      id: "sdgvzdvsdc",
      movieName: "Avengers: Endgame",
      ticketCode: "VE123456",
      score: 9,
      date: "2025-05-01",
      comment: "Một bộ phim kết thúc tuyệt vời cho cả loạt phim!",
    },
    {
      id: "dddvcadcs",
      movieName: "Dune: Part Two",
      ticketCode: "VE654321",
      score: 8,
      date: "2025-04-15",
      comment: "Hình ảnh hoành tráng và cốt truyện hấp dẫn.",
    },
    {
      id: "fbgdbdfdvcd",
      movieName: "Kung Fu Panda 4",
      ticketCode: "VE246810",
      score: 7,
      date: "2025-05-20",
      comment: "Vui nhộn, thích hợp cho gia đình và trẻ nhỏ.",
    },
    {
      id: "gdbdfb43f",
      movieName: "The Batman",
      ticketCode: "VE135791",
      score: 8.5,
      date: "2025-03-25",
      comment: "Phong cách đen tối rất phù hợp với nhân vật Batman.",
    },
    {
      id: "dgnfdgb65f",
      movieName: "Inside Out 2",
      ticketCode: "VE999888",
      score: 9.5,
      date: "2025-06-01",
      comment: "Cảm động và truyền cảm hứng về cảm xúc con người.",
    },
  ];
  const col: Column<ReviewType>[] = [
    { key: "movieName", title: "Movie Name" },
    { key: "ticketCode", title: "Ticket Code" },
    { key: "score", title: "Score" },
    { key: "date", title: "Date" },
    { key: "comment", title: "Comment" },
    {
      title: "Action",
      render(row: ReviewType) {
        return (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => handleEdit(row.id)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(row.id)}
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  const handleEdit = (id: string | number) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string | number) => {
    console.log("Delete", id);
  };
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Đánh Gía">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={rating} />
    </div>
  );
};

export default UserManagement;
