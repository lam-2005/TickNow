"use client";
import React, { useEffect, useRef } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { ReviewType } from "@/interfaces/rating.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchRatings, setInitialRatings } from "@/utils/redux/slices/ratingSlice";
import usePanigation from "@/hooks/usePanigation";
import dataRating from "@/utils/redux/selectors/ratingSeletor";

type InitDataType = {
  ratings: ReviewType[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const RatingList = ({ initData }: { initData: InitDataType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const { ratings, total, currentPage, totalPages, loading, error } = useSelector(dataRating);
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(initData.currentPage);

  useEffect(() => {
    dispatch(setInitialRatings({
        ...initData,
        loading: false,
        error: null,
        }));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    dispatch(fetchRatings({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const columns: Column<ReviewType>[] = [
    { key: "movieName", title: "Tên Phim" },
    { key: "userName", title: "Tên Người Dùng" },
    { key: "score", title: "Điểm" },
    {
      key: "date",
      title: "Ngày Đánh Giá",
      render: (row: ReviewType) => {
        const date = new Date(row.date);
        return !isNaN(date.getTime()) ? date.toLocaleDateString("vi-VN") : "Chưa xác định";
      },
    },
    {
      key: "comment",
      title: "Bình Luận",
      render: (row: ReviewType) => (
        <span className="line-clamp-2 block max-w-xs">{row.comment}</span>
      ),
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Table column={columns} data={ratings} currentPage={currentPage} rowsPerPage={rowsPerPage} />
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

export default RatingList;
