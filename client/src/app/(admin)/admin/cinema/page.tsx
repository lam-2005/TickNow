import AddCinemaBtn from '@/admin_components/CinemaManagementComponents/AddCinema/ButtonOpenCinema';
import CinemaList from '@/admin_components/CinemaManagementComponents/CinemaList';
import FilterCinema from '@/admin_components/CinemaManagementComponents/FilterCinema/FIlterCinema';
import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
import { getCinemaList, getLocationList } from '@/services/cinema.service';
import React, { Suspense } from 'react'

export const getCinemas = async (
  page: number, 
  limit: number,
  name: string | null = null,
  location: string | null = null,
  status: string | null = null,
) => {
  let queries = `?page=${page}&limit=${limit}`;

  if (name) {
    queries += `&name=${name}`;
  }

  if (location) {
    queries += `&location=${location}`;
  }

  if (status) {
    queries += `&status=${status}`;
  }

  const res = await getCinemaList(queries);
  return {
    cinemas: res?.cinema,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
    name: name,
    location: location,
    status: status,
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

      <FilterCinema locations={locations} />

      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <CinemaList initData={cinemas} initLocations={locations} />
      </Suspense>
    </div>
  )
}

export default CinemaManagement