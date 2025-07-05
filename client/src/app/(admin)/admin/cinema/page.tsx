import AddCinemaBtn from '@/admin_components/CinemaManagementComponents/AddCinema/ButtonOpenCinema';
import CinemaList from '@/admin_components/CinemaManagementComponents/CinemaList';
import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
import { getCinemaList, getLocationList } from '@/services/cinema.service';
import React, { Suspense } from 'react'

export const getCinemas = async (page: number, limit: number) => {
  const res = await getCinemaList(`?page=${page}&limit=${limit}`);
  return {
    cinemas: res?.cinema,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
  };
};

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
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <CinemaList initData={cinemas} initLocations={locations} />
      </Suspense>
    </div>
  )
}

export default CinemaManagement