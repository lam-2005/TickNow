import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import * as screenService from "@/services/screening.service";
import ScreenList from "@/admin_components/ScreenManagementComponents/ScreenList";
import AddScreenBtn from "@/admin_components/ScreenManagementComponents/AddForm/ButtonOpenForm";
import { getMovieList } from "@/services/movie.service";
import { getRoom } from "@/services/room.service";
export const getScreenData = async (page: number, limit: number) => {
  const res = await screenService.getScreeningList(
    `?page=${page}&limit=${limit}`
  );
  return {
    Screen: res?.data.result,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
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
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <ScreenList initData={res} moviesOptions={movies} rooms={rooms} />
      </Suspense>
    </div>
  );
};

export default ScreenManagement;
