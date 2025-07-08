import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as screenService from "@/services/screening.service";
import ScreenList from "@/admin_components/ScreenManagementComponents/ScreenList";
import AddScreenBtn from "@/admin_components/ScreenManagementComponents/AddForm/ButtonOpenForm";
import { getMovieList } from "@/services/movie.service";
import { getRoom } from "@/services/room.service";
import FilterScreening from "@/admin_components/ScreenManagementComponents/FilterScreening/FIlterScreening";
export const getScreenData = async (
  page: number,
  limit: number,
  movie: string = "",
  date: string = "",
  status: string = "",
  showtype: string = "",
  timeStart: string = "",
  timeEnd: string = ""
) => {
  const res = await screenService.getScreeningList(
    `?page=${page}&limit=${limit}&movie=${movie}&date=${date}&status=${status}&showtype=${showtype}&timeStart=${timeStart}&timeEnd=${timeEnd}`
  );
  return {
    Screen: res?.data.result,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    movie,
    date,
    status,
    showtype,
    timeEnd,
    timeStart,
  };
};
const getMovie = async () => {
  const res = await getMovieList();
  return res.data.movie;
};
const getRoomList = async () => {
  const res = await getRoom();
  return res?.data.room;
};

const ScreenManagement = async () => {
  const res = await getScreenData(1, 5);
  const movies = await getMovie();
  const rooms = await getRoomList();

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Suất Chiếu">
        <AddScreenBtn movies={movies} rooms={rooms} />
      </HeadingCard>
      <FilterScreening movies={movies} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <ScreenList initData={res} moviesOptions={movies} rooms={rooms} />
      </Suspense>
    </div>
  );
};

export default ScreenManagement;
