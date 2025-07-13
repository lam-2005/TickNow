import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import ScreenList from "@/admin_components/ScreenManagementComponents/ScreenList";
import AddScreenBtn from "@/admin_components/ScreenManagementComponents/AddForm/ButtonOpenForm";
import { getMovieList } from "@/services/movie.service";
import { getRoom } from "@/services/room.service";
import FilterScreening from "@/admin_components/ScreenManagementComponents/FilterScreening/FIlterScreening";
import { getScreenData } from "@/services/screening.service";

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
