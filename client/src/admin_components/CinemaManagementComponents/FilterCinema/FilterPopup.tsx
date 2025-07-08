"use client";
import React, { useEffect, useState } from "react";
import PopupContainer from "../PopupContainer";
import { Cinema, Location } from "@/interfaces/cinema.interface";
import dataCinemaSelector from "@/utils/redux/selectors/selectorCinema";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaList } from "@/services/cinema.service";
import { AppDispatch } from "@/utils/redux/store";
import { fetchCinemas, setFilter } from "@/utils/redux/slices/cinemaSlice";

type Props = {
  closeForm: () => void;
  locations: Location[];
};

const FilterItem = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
    >
      {title}
    </div>
  );
};

const FilterPopup = ({ closeForm, locations }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [status, setStatus] = useState<number[]>([]);
  const [name, setName] = useState<string>();
  const { filter } = useSelector(dataCinemaSelector);

  useEffect(() => {
    getCinemaList().then(res => {
      setCinemas(res?.cinema ?? [])
    });
  }, [])

  const handleGetLocation = (id: string) => {
    setSelectedLocations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGetStatus = (id: number) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setName(filter.name ?? '')
  
    if (filter.locations) {
      setSelectedLocations(filter.locations.split(",").map((s) => s));
    } else {
      setSelectedLocations([]);
    }

    if (filter.status) {
      setStatus(filter.status.split(",").map((s) => Number(s)));
    } else {
      setStatus([]);
    }
  }, [filter]);
  
  const handleFilter = () => {
    dispatch(
      fetchCinemas({
        limit: 5,
        page: 1,
        name: name,
        locations: selectedLocations.join(","),
        status: status.join(","),
      })
    );
    dispatch(
      setFilter({
        name: name,
        locations: selectedLocations.join(","),
        status: status.join(","),
      })
    );
    closeForm();
  };

  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-y-scroll">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn tên:</h1>
          <div className="flex flex-wrap gap-4">
            {cinemas?.length > 0 ? (
              cinemas.map((loc) => (
                <button key={loc._id} onClick={() => name == loc.name ? setName("") : setName(loc.name)}>
                  <FilterItem
                    title={loc.name}
                    className={`${
                      name == loc.name
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu cinema.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn khu vực:</h1>
          <div className="flex flex-wrap gap-4">
            {locations?.length > 0 ? (
              locations.map((loc) => (
                <button key={loc._id} onClick={() => handleGetLocation(loc._id)}>
                  <FilterItem
                    title={loc.name}
                    className={`${
                      selectedLocations.includes(loc._id)
                        ? "bg-primary text-white border-transparent"
                        : ""
                    }`}
                  />
                </button>
              ))
            ) : (
              <p className="text-sm italic text-muted">Không có dữ liệu khu vực.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((stt) => (
              <button key={stt} onClick={() => handleGetStatus(stt)}>
                <FilterItem
                  className={`${
                    status.includes(stt)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={stt === 1 ? "Hoạt động" : "Ngừng hoạt động"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};

export default FilterPopup;
