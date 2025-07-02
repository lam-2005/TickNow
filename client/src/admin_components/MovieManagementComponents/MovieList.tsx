"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import usePanigation from "@/hooks/usePanigation";
import { MovieType } from "@/interfaces/movie.interface";
import MovieDetailPopup from "@/admin_components/Popup/MovieDetailPopup";
import PopupUpdateForm from "@/admin_components/Popup/UpdateForm";
import {
  fetchMovies,
  setInitialMovies,
  updateMovie,
  deleteMovie,
} from "@/utils/redux/slices/movieSlice";
import dataMovie from "@/utils/redux/selectors/movieSlector";
import { toast } from "react-toastify";

type InitDataType = {
  movies: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const MovieList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);

  const {
    data: movies,
    total,
    currentPage,
    totalPages,
    loading,
    error,
  } = useSelector(dataMovie);

  const { page, changePage, changeRowPerPage, rowsPerPage } =
    usePanigation(initData.currentPage);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  // Set dữ liệu ban đầu
  useEffect(() => {
    dispatch(
      setInitialMovies({
        data: initData.movies,
        total: initData.total,
        currentPage: initData.currentPage,
        totalPages: initData.totalPages,
        loading: false,
        error: null,
        errorAddData: null,
        errorUpdateData: null,
      })
    );
  }, [dispatch, initData]);

  // Fetch khi thay đổi trang/số dòng
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (page <= totalPages) {
      dispatch(fetchMovies({ limit: rowsPerPage, page }));
    } else {
      dispatch(fetchMovies({ limit: rowsPerPage, page: totalPages }));
    }
  }, [dispatch, page, rowsPerPage, totalPages]);

  const handleOpenDetail = (movie: MovieType) => {
    setSelectedMovie(movie);
    setShowInfo(true);
  };

  const handleOpenUpdate = (movie: MovieType) => {
    setSelectedMovie(movie);
    setIsEditOpen(true);
  };

  const handleUpdate = async (id: string, data: Partial<MovieType>) => {
    try {
      const sure = confirm("Bạn có muốn cập nhật phim này?");
      if (!sure) return;
      await dispatch(updateMovie({ id, data })).unwrap();
      toast.success("Cập nhật phim thành công!");
      dispatch(fetchMovies({ page: currentPage, limit: rowsPerPage }));
    } catch (err) {
      console.log("Cập nhật phim thất bại:", err);
      toast.error("Cập nhật phim thất bại!");
    }
  };

  const handleDelete = async (id: string) => {
    const sure = confirm("Bạn có chắc muốn xóa phim này?");
    if (!sure) return;

    try {
      await dispatch(deleteMovie(id)).unwrap();
      toast.success("Xoá phim thành công!");
      dispatch(fetchMovies({ page, limit: rowsPerPage }));
    } catch (err) {
      console.log("Xoá phim thất bại:", err);
      toast.error("Xoá phim thất bại!");
    }
  };

  const col: Column<MovieType>[] = [
    { key: "name", title: "Tên Phim" },
    {
      key: "release_date",
      title: "Ngày Công Chiếu",
      render: (row) => {
        const date = new Date(row.release_date);
        return !isNaN(date.getTime())
          ? date.toLocaleDateString("vi-VN")
          : "Chưa xác định";
      },
    },
    { key: "director", title: "Đạo Diễn" },
    { key: "nation", title: "Quốc Gia" },
    { key: "age", title: "Độ Tuổi" },
    { key: "duration", title: "Thời Lượng (phút)" },
    {
      title: "Thao Tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Sửa"
            bgColor="warning"
            onClick={() => handleOpenUpdate(row)}
          />
          <ActionButton
            label="Xoá"
            bgColor="error"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
    {
      title: "Chi Tiết",
      render: (row) => (
        <ActionButton label="Xem" onClick={() => handleOpenDetail(row)} />
      ),
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      {showInfo && selectedMovie && (
        <MovieDetailPopup
          movie={selectedMovie}
          onClose={() => {
            setShowInfo(false);
            setSelectedMovie(null);
          }}
        />
      )}
      {isEditOpen && selectedMovie && (
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
          onSubmit={(data) => {
            if (!selectedMovie?._id) return;
            handleUpdate(selectedMovie._id, data);
          }}
        />
      )}

      <Table
        column={col}
        data={movies}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
      {total >= rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
    </>
  );
};

export default MovieList;
