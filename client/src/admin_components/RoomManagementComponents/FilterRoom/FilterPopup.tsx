import React, { useEffect, useState } from "react";
import { Cinema } from "@/interfaces/cinema.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { fetchRooms, setFilter } from "@/utils/redux/slices/roomSlice";
import dataRoom from "@/utils/redux/selectors/roomSelector";
import PopupContainer from "@/admin_components/PopupContainer";

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
const FilterPopup = ({
  closeForm,
  data,
}: {
  closeForm: () => void;
  data: Cinema[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [idCinemas, setIdCinemas] = useState<string[]>([]);
  const [status, setStatus] = useState<number[]>([]);
  const { filter } = useSelector(dataRoom);
  const handleGetIdCinema = (id: string) => {
    setIdCinemas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleGetStatus = (id: number) => {
    setStatus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    if (filter.cinemas) {
      setIdCinemas(filter.cinemas.split(","));
    } else {
      setIdCinemas([]);
    }
    if (filter.status) {
      setStatus(filter.status.split(",").map((s) => Number(s)));
    } else {
      setStatus([]);
    }
  }, [filter]);

  const handleFilter = async () => {
    dispatch(
      setFilter({
        cinemas: idCinemas.join(","),
        status: status.join(","),
      })
    );
    await dispatch(
      fetchRooms({
        limit: 5,
        page: 1,
        cinemas: idCinemas.join(","),
        status: status.join(","),
      })
    );

    closeForm();
  };
  return (
    <PopupContainer title="Bộ lọc" closeForm={closeForm}>
      <div className="p-5 space-y-5">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn rạp:</h1>
          <div className="flex flex-wrap gap-4">
            {data.map((cinema) => (
              <button
                key={cinema._id}
                onClick={() => handleGetIdCinema(cinema._id)}
              >
                {" "}
                <FilterItem
                  title={cinema.name}
                  className={`${
                    idCinemas.includes(cinema._id)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl font-bold">Chọn trạng thái:</h1>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((stt) => (
              <button key={stt} onClick={() => handleGetStatus(stt)}>
                <FilterItem
                  className={`${
                    status.includes(stt)
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }`}
                  title={`${
                    stt === 1
                      ? "Không hoạt động"
                      : stt === 2
                      ? "Hoạt động"
                      : "Đang bảo trì"
                  }`}
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
