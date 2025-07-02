"use client";
import React, { useEffect, useRef, useState } from "react";
import * as movieService from "@/services/movie.service";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { MovieType } from "@/interfaces/movie.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import MovieDetailPopup from "@/admin_components/Popup/MovieDetailPopup";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import AddForm from "@/admin_components/Popup/AddPopup";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddBtn from "@/admin_components/Button/AddBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataMovie from "@/utils/redux/selectors/movieSlector";
import { fetchMovies, setInitialMovies } from "@/utils/redux/slices/movieSlice";
import usePanigation from "@/hooks/usePanigation";
import OptionTable from "@/admin_components/OptionTable/OptionTable";

type InitDataType = {
  movies: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const MovieList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const { movies, total, currentPage, totalPages, loading, error } = useSelector(dataMovie);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(initData.currentPage);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    dispatch(setInitialMovies({ ...initData, loading: false, error: null }));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchMovies({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (id: string | number) => {
    const movie = movies.find((m) => m._id === id);
    if (movie) {
      setSelectedMovie(movie);
      setIsEditOpen(true);
    }
  };
  const handleDelete = async (id: string | number) => {
  if (confirm("Bạn có chắc muốn xóa phim này?")) {
    try {
      await movieService.deleteMovie(id);
      alert("Đã xoá phim!");
      dispatch(fetchMovies({ page, limit: rowsPerPage }));
    } catch (err) {
      console.error("Lỗi xoá phim:", err);
      alert("Xoá phim thất bại!");
    }
    }
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

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
    <HeadingCard title="Quản lý Phim Chiếu">
        <AddBtn onClick={() => setShowAddPopup(true)} />
    </HeadingCard>
    <OptionTable />
      {selectedMovie && <MovieDetailPopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      <Table column={col} data={movies} currentPage={currentPage} rowsPerPage={rowsPerPage} />
      <Pagination
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
        rowPerPage={rowsPerPage}
        setPage={changePage}
        setRowPerPage={changeRowPerPage}
      />
      <AddForm
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
          { label: "Mô tả", key: "description", type: "textarea", rows: 4 },
        ]}
        onSubmit={async (data) => {
          try {
            await movieService.createMovie(data);
            alert("Thêm phim thành công!");
            setShowAddPopup(false);
            dispatch(fetchMovies({ page, limit: rowsPerPage }));
          } catch (err) {
            console.error("Lỗi thêm phim:", err);
            alert("Thêm phim thất bại!");
          }
        }}
      />

      <PopupUpdateForm
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedMovie(null);
        }}
        initialData={selectedMovie as unknown as Record<string, unknown>}
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
          { label: "Trailer", key: "trailer" },
          { label: "Hình ảnh", key: "image" },
          { label: "Banner", key: "banner" },
        ]}
        onSubmit={async (data) => {
          try {
            if (!selectedMovie?._id) return;
              await movieService.updateMovie(selectedMovie._id, data);
              alert("Cập nhật phim thành công!");
              setIsEditOpen(false);
              setSelectedMovie(null);
              dispatch(fetchMovies({ page, limit: rowsPerPage }));
            } catch (err) {
              console.error("Lỗi cập nhật phim:", err);
              alert("Cập nhật thất bại!");
            }
        }}
      />
    </>
  );
};

export default MovieList;
