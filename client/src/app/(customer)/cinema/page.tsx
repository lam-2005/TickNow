import React from "react";
import { getCinemaList, getLocationList } from "@/services/cinema.service";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import FilterCinema from "@/components/CinemaComponent/FilterCinema";
import CinemaList from "@/components/CinemaComponent/CinemaList";

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
    return res.cinema;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const CinemaPage = async ({
  searchParams,
}: {
  searchParams: { locationId?: string };
}) => {
  const locationId = searchParams.locationId || "";
  const locationList = await getLocation();
  const cinemas = await getCinema(locationId);

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
