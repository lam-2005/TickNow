"use client";
import SelectContainer, { SelectComponent } from "@/components/Select/Select";
import { Location } from "@/interfaces/cinema.interface";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";

const FilterCinema = ({ locations }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedLocation = searchParams.get("locationId") || "";

  const handleChange = (location: string) => {
    const params = new URLSearchParams(searchParams);
    if (location) {
      params.set("locationId", location);
    } else {
      params.delete("locationId");
    }
    router.push(`/cinema?${params.toString()}`, { scroll: false });
  };
  return (
    <SelectContainer>
      <SelectComponent
        leftIcon={<RiMapPin2Fill className="text-foreground" size={20} />}
        getLabel={(item) => item.name}
        data={locations}
        defaultValue={selectedLocation}
        getValue={(item) => item._id}
        onChange={handleChange}
        placeholder="Tất cả địa điểm"
      />
    </SelectContainer>
  );
};

export default FilterCinema;
