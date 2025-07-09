import { CinemaCreateOrUpdate, Location } from "@/interfaces/cinema.interface";
import React, { useState } from "react";
import InputGroup from "../InputGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { createCinema, fetchCinemas } from "@/utils/redux/slices/cinemaSlice";
export type LocationType = {
  label: string;
  id: string;
};
type AddFormProps = {
  locations: Location[];
  closeForm: () => void;
};
const AddForm = ({ locations, closeForm }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<CinemaCreateOrUpdate>({
    id: "",
    name: "",
    image: "",
    status: 1,
    file: null,
    id_location: "",
    deatil_location: "",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.deatil_location || !formData.id_location) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const sure = confirm("Bạn có muốn thêm?");
      if (!sure) return;

      await dispatch(createCinema({ data: formData })).unwrap();
      toast.success("Thêm phòng thành công!");
      dispatch(fetchCinemas({ limit: 5, page: 1 }));
    } catch (err) {
      toast.error(`Thêm phòng thất bại: ${err}`);
      console.error(err);
    }

    closeForm();
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          locations={locations}
          isCreate={true}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAdd}>
          Thêm rap chiếu
        </button>
      </div>
    </>
  );
};

export default AddForm;
