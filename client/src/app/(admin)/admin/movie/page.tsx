"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";
import ActionButton from "@/admin_components/Button/ButtonActions";

const MovieManagement = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await movieService.getMovieList("?limit=5&page=1");
        console.log("Dữ liệu từ API:", res?.data.movie);
        setMovies(res?.data.movie || []);
      } catch (error) {
        console.error("Lỗi khi fetch movies:", error);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const col: Column<MovieType>[] = [
    { key: "name", title: "Tên Phim" },
    {
      key: "release_date",
      title: "Ngày Công Chiếu",
      render: (row: MovieType) => {
        const date = new Date(row.release_date);
        return !isNaN(date.getTime()) ? date.toLocaleDateString("vi-VN") : "Chưa Xác Định";
      },
    },
    { key: "director", title: "Đạo Diễn" },
    { key: "nation", title: "Quốc Gia" },
    { key: "age", title: "Độ Tuổi" },
    { title: "Thể Loại",
      render(){
        return(
          <div className="w-full px-4 py-2 text-center">
            Đang cập nhật
          </div>
        )
      }
     },
    { key: "duration", title: "Thời Lượng" },
    {
      title: "Thao tác",
      render(row: MovieType) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              onClick={handleEdit}
              bgColor="bg-yellow-500"
              id={row._id}
            />
            <ActionButton
              label="Xóa"
              onClick={handleDelete}
              bgColor="bg-red-500"
              id={row._id}
            />
          </div>
        );
      },
    },
  ];

  const handleEdit = (id: string | number) => {
    alert(`Edit ${id}`);
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete ${id}`);
  };

  return (
    <div className="card">
      <HeadingCard title="Quản lý Phim Chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <Table column={col} data={movies} />
      )}
    </div>
  );
};

export default MovieManagement;