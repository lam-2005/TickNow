import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupContainer from "@/admin_components/PopupContainer";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { AppDispatch } from "@/utils/redux/store";
import { fetchCinema, setFilterCinema } from "@/utils/redux/slices/cinemaSlice";
import { Cinema, LocationRes } from "@/interfaces/cinema.interface";
import cinemaSelector from "@/utils/redux/selectors/selectorCinema";

const FilterItem = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <div
    className={`border-1 border-foreground text-foreground flex-center w-fit px-2 py-1 transition-colors rounded-md hover:bg-primary hover:text-white hover:border-transparent cursor-pointer ${className}`}
  >
    {title}
  </div>
);

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const FilterPopup = ({
  locations,
  closeForm,
  cinemas,
}: {
  locations: LocationRes[];
  closeForm: () => void;
  cinemas: Cinema[];
}) => {
  const listLocationOptions = locations.map((item) => ({
    label: item.name,
    id: item._id,
  }));

  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector(cinemaSelector);

  const [name, setName] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setName(filter.name || "");
    setStatus(filter.status || "");
    setSelectedLocations(filter.location ? filter.location.split(",") : []);
  }, [filter]);

  const handleLocationChange = (values: { label: string; id: string }[]) => {
    const ids = values.map((item) => item.id);
    setSelectedLocations(ids);
  };

  const handleFilter = () => {
    dispatch(
      fetchCinema({
        page: 1,
        limit: 5,
        name,
        location: selectedLocations.join(","),
        status,
      })
    );
    dispatch(
      setFilterCinema({
        name,
        location: selectedLocations.join(","),
        status,
      })
    );
    closeForm();
  };
  const handleReset = () => {
    setName("");
    setSelectedLocations([]);
    setStatus("");
  };
  return (
    <PopupContainer title="Bộ lọc rạp chiếu" closeForm={closeForm}>
      <div className="p-5 space-y-5 overflow-hidden overflow-y-auto">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Tên rạp:</label>
          <div className="flex flex-wrap gap-4">
            <Autocomplete
              freeSolo
              className="w-full"
              options={cinemas}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              value={name}
              onInputChange={(_, value) => setName(value)}
              onChange={(_, value) => {
                if (typeof value === "string") {
                  setName(value);
                } else if (value) {
                  setName(value.name);
                } else {
                  setName("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm Rạp"
                  placeholder="Nhập từ khóa"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Chọn khu vực:</label>
          <Autocomplete
            multiple
            id="checkboxes-location"
            className="w-full"
            options={listLocationOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            value={listLocationOptions.filter((option) =>
              selectedLocations.includes(option.id)
            )}
            onChange={(_, values) => handleLocationChange(values)}
            renderOption={(props, option, { selected }) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn khu vực"
                placeholder="Khu vực"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg">Trạng thái:</label>
          <div className="flex gap-4 flex-wrap">
            {["1", "2"].map((stt) => (
              <button
                key={stt}
                onClick={() => setStatus(status === stt ? "" : stt)}
              >
                <FilterItem
                  className={
                    status === stt
                      ? "bg-primary text-white border-transparent"
                      : ""
                  }
                  title={stt === "1" ? "Không hoạt động" : "Hoạt động"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-5 w-full gap-4 bg-background-card rounded-2xl">
        <button
          className="btn border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
          onClick={handleReset}
        >
          Đặt lại bộ lọc
        </button>
        <button className="btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </PopupContainer>
  );
};

export default FilterPopup;
