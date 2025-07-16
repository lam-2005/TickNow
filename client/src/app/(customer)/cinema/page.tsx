import React from "react";
import { getCinemaList } from "@/services/cinema.service";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import FilterCinema from "@/components/CinemaComponent/FilterCinema";
import CinemaList from "@/components/CinemaComponent/CinemaList";
import { getLocationList } from "@/services/location.service";

const getLocation = async () => {
  try {
    const res = await getLocationList();
    return res.location;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getCinema = async (locationId: string) => {
  try {
    const res = await getCinemaList(
      locationId ? `?location=${locationId}` : ""
    );
    return res?.data.cinema;
  } catch (error) {
    console.error(error);
  }
};
const CinemaPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) => {
  const { locationId } = await searchParams;
  const locationList = await getLocation();
  const cinemas = await getCinema(locationId || "");

  return (
    <>
      <BackgroundPage image="background_cinema.webp" title="Rạp chiếu">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <FilterCinema locations={locationList} />
        </div>
      </BackgroundPage>

      <CinemaList cinemas={cinemas} />
    </>
  );
};

export default CinemaPage;
