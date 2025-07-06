"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import usePanigation from "@/hooks/usePanigation";
import { MovieReq, MovieType } from "@/interfaces/movie.interface";
import {
  fetchMovies,
  setInitialMovies,
  updateMovie,
} from "@/utils/redux/slices/movieSlice";
import dataMovie from "@/utils/redux/selectors/movieSlector";
import { toast } from "react-toastify";
import MovieDetail from "./DetailMovie/DetailMovie";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import Genre from "@/interfaces/genre.interface";

type InitDataType = {
  movies: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const MovieList = ({ initData , genre}: { initData: InitDataType, genre:Promise<Genre[]> }) => {
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

  const handleUpdate = async (id: string, data: MovieReq) => {
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
    {
      title: "Trạng thái",
      render: (row) => (
        <ActionButton
          label={
            row.status === 1
              ? "Đang Chiếu"
              : row.status === 2
              ? "Sắp Chiếu"
              : "Ngưng Chiếu"
          }
          bgColor={
            row.status === 1
              ? "success"
              : row.status === 2
              ? "warning"
              : "error"
          }
          onClick={()=>null}
        />
      ),
    },
    {
      title: "Thể Loại",
      render: (row: MovieType) => {
        return (
          <div className="flex flex-wrap gap-1">
            {row.genre && row.genre.length > 0 ? (
              row.genre.map((g) => (
                <span
                  key={g.id}
                  className="bg-blue-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {g.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm italic">Chưa xác định</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Thao Tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Sửa"
            bgColor="warning"
            onClick={() => handleOpenUpdate(row)}
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
        <MovieDetail movie={selectedMovie} onClose={() => {
          setShowInfo(false);
          setSelectedMovie(null);
        }} />
      )}
      {isEditOpen && selectedMovie && (
        <UpdateFormContainer
          genre={use(genre)}
          info={selectedMovie}
          closeForm={() => {
            setIsEditOpen(false);
            setSelectedMovie(null);
          }}
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
