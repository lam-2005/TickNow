"use client";
import React, { useEffect, useState, useCallback } from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";
import ActionButton from "@/admin_components/Button/ButtonActions";
import Pagination from "@/admin_components/Pagination/Pagination";
import MovieDetailPopup from "@/admin_components/Popup/MovieDetailPopup";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";

const MovieManagement = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<MovieType | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await movieService.getMovieList(`?page=${currentPage}&limit=${rowsPerPage}`);
      const data = res?.data;
      setMovies(data.movie || []);
      setCurrentPage(data.pagination?.page || 1);
      setTotalItems(data.pagination?.total || 0);
    } catch (error) {
      console.error("Lỗi khi fetch movies:", error);
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleEdit = (id: string | number) => {
    const movie = movies.find((m) => m._id === id);
    if (movie) {
      setMovieToEdit(movie);
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id: string | number) => {
    alert(`Delete ${id}`);
  };

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
    {
      title: "Thể Loại",
      render() {
        return <div className="w-full px-4 py-2 text-center">Đang cập nhật</div>;
      },
    },
    { key: "duration", title: "Thời Lượng" },
    {
      title: "Thao tác",
      render(row: MovieType) {
        return (
          <div className="flex gap-2">
            <ActionButton label="Sửa" onClick={handleEdit} bgColor="bg-yellow-500" id={row._id} />
            <ActionButton label="Xóa" onClick={handleDelete} bgColor="bg-red-500" id={row._id} />
          </div>
        );
      },
    },
    {
      title: "Chi tiết",
      render(row: MovieType) {
        return (
          <div className="flex gap-2 w-full">
            <ActionButton
              label="Xem"
              onClick={() => setSelectedMovie(row)}
              bgColor="bg-blue-500"
              id={row._id}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <HeadingCard title="Quản lý Phim Chiếu">
        <AddBtn onClick={() => setShowAddPopup(true)} />
      </HeadingCard>

      {selectedMovie && (
        <MovieDetailPopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <OptionTable />

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-primary text-center">{error}</p>
      ) : (
        <>
          <Table column={col} data={movies} />
          <Pagination
            currentPage={currentPage}
            total={totalItems}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </>
      )}

      <AddForm<Record<string, unknown>>
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        fields={[
          { label: "Tên phim", key: "name", required: true },
          { label: "Ngày công chiếu", key: "release_date", type: "date", required: true },
          { label: "Quốc gia", key: "nation", required: true },
          { label: "Ngôn ngữ", key: "language", required: true },
          { label: "Thời lượng (phút)", key: "duration", type: "number", required: true },
          { label: "Độ tuổi", key: "age", required: true },
          { label: "Đạo diễn", key: "director", required: true },
          { label: "Diễn viên", key: "actor", required: true },
          { label: "Trailer", key: "trailer" },
          { label: "Hình ảnh", key: "image" },
          { label: "Banner", key: "banner" },
          {
            label: "Trạng thái",
            key: "status",
            type: "select",
            required: true,
            options: [
              { label: "Đang Chiếu", value: "1" },
              { label: "Sắp Chiếu", value: "2" },
              { label: "Ngừng Chiếu", value: "3" },
            ],
          },
          { label: "Mô tả", key: "description",type:"textarea", rows: 4  },
        ]}
        onSubmit={async () => {
          try {
            // await movieService.createMovie(data);
            alert("Thêm phim thành công!");
            setShowAddPopup(false);
            setCurrentPage(1);
            fetchMovies();
          } catch (error) {
            console.error("Lỗi thêm phim:", error);
            alert("Thêm phim thất bại!");
          }
        }}
      />

      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setMovieToEdit(null);
        }}
        initialData={movieToEdit as unknown as Record<string, unknown>}
        fields={[
          { label: "Tên phim", key: "name" },
          { label: "Ngày công chiếu", key: "release_date", type: "date" },
          { label: "Quốc gia", key: "nation" },
          { label: "Ngôn ngữ", key: "language" },
          { label: "Thời lượng (phút)", key: "duration", type: "number" },
          { label: "Độ tuổi", key: "age" },
          { label: "Đạo diễn", key: "director" },
          { label: "Diễn viên", key: "actor" },
          { label: "Trạng thái", key: "status", type: "number" },
          { label: "Đánh giá sao", key: "star", type: "number" },
          { label: "Trailer", key: "trailer" },
          { label: "Hình ảnh", key: "image" },
          { label: "Banner", key: "banner" },
        ]}
        onSubmit={async () => {
          try {
            if (!movieToEdit?._id) return;
            // await movieService.updateMovie(movieToEdit._id, data);
            alert("Cập nhật phim thành công!");
            setIsEditOpen(false);
            setMovieToEdit(null);
            fetchMovies();
          } catch (err) {
            console.error("Lỗi cập nhật phim:", err);
            alert("Cập nhật thất bại!");
          }
        }}
      />
    </div>
  );
};

export default MovieManagement;
