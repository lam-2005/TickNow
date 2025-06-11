"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { MovieType } from "@/interfaces/movie.interface";

const MovieManagement = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies?_limit=5");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Lỗi khi fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const col: Column<MovieType>[] = [
    { key: "name", title: "Name" },
    { key: "date", title: "Date" },
    { key: "director", title: "Director" },
    { key: "nation", title: "Nation" },
    { key: "age", title: "Age" },
    { key: "category", title: "Category" },
    { key: "time", title: "Time" },
    {
      title: "Thao tác",
      render(row: MovieType) {
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
      <HeadingCard title="Quản lý Phim Chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table column={col} data={movies} />
      )}
    </div>
  );
};

export default MovieManagement;
