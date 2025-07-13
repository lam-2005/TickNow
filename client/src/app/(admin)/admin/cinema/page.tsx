import AddCinemaBtn from "@/admin_components/CinemaManagementComponents/AddCinema/ButtonOpenCinema";
import CinemaList from "@/admin_components/CinemaManagementComponents/CinemaList";
import FilterCinema from "@/admin_components/CinemaManagementComponents/FilterCinema/FIlterCinema";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import { getCinemas, getLocationList } from "@/services/cinema.service";
import React, { Suspense } from "react";

const getLocations = async () => {
  const res = await getLocationList();
  return res.location;
};

const CinemaManagement = () => {
  const cinemas = getCinemas(1, 10);
  const locations = getLocations();

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Rap Chiếu">
        <AddCinemaBtn locations={locations} />
      </HeadingCard>
      {/* <OptionTable /> */}

      <FilterCinema locations={locations} />

      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <CinemaList initData={cinemas} initLocations={locations} />
      </Suspense>
    </div>
  );
};

export default CinemaManagement;
