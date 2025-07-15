import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import CinemaList from "@/admin_components/CinemaManagementComponents/CinemaList";
import AddCinemaBtn from "@/admin_components/CinemaManagementComponents/AddForm/ButtonOpenCinema";
import FilterCinema from "@/admin_components/CinemaManagementComponents/FilterCinema/FIlterCinema";
import { getCinemaData } from "@/services/cinema.service";
import { getLocationList } from "@/services/location.service";

const getLocations = async () => {
  const res = await getLocationList();
  return res?.location || [];
};

const CinemaManagement = async () => {
  const initData = await getCinemaData(1, 5);
  const locations = await getLocations(); 

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Rạp Chiếu">
        <AddCinemaBtn locations={locations} />
      </HeadingCard>
      <FilterCinema locations={locations} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <CinemaList initData={initData} locations={locations} />
      </Suspense>
    </div>
  );
};

export default CinemaManagement;
