// import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import React from "react";
import { getLocationList } from "@/services/cinema.service";
import CinemaList from "./CinemaComponent/CinemaList";

const getLocation = async () => {
  try {
    const res = await getLocationList();
    return res.location;
  } catch (error) {
    console.error(error);
  }
};
const CinemaPage = async () => {
  const locations = await getLocation();
  return <CinemaList data={locations} />;
};

export default CinemaPage;
