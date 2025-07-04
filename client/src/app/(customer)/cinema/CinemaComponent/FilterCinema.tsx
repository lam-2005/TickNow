"use client";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Location } from "@/interfaces/cinema.interface";
import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";

const FilterCinema = ({
  locations,
  selectedLocation,
  setSelectedLocation,
}: {
  locations: Location[];
  selectedLocation: string;
  setSelectedLocation: (data: string) => void;
}) => {
  return (
    <SelectContainer>
      <SelectComponent
        leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
        getLabel={(item) => item.name}
        data={locations}
        defaultValue={selectedLocation}
        getValue={(item) => item._id}
        onChange={(location) => setSelectedLocation(location)}
        placeholder="Tất cả địa điểm"
      />
    </SelectContainer>
  );
};

export default FilterCinema;
