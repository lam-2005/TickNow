import { Cinema, CinemaCreateOrUpdate, Location } from "@/interfaces/cinema.interface";
import React, { useState } from "react";
import InputGroup from "../InputGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { updateCinema } from "@/utils/redux/slices/cinemaSlice";

export type CinemaType = {
  label: string;
  id: string;
};
type UpdateFormProps = {
  cinema: Cinema;
  locations: Location[];
  closeForm: () => void;
};

const UpdateForm = ({ cinema, locations, closeForm }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<CinemaCreateOrUpdate>({
        id: cinema._id,
        name: cinema.name,
        image: cinema.image,
        status: cinema.status,
        file: null,
        id_location: cinema.location.id_location,
        deatil_location: cinema.location.deatil_location,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
        !formData.name || 
        !formData.deatil_location || 
        !formData.id_location
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
        const sure = confirm("Bạn có muốn cập nhật?");
        if (!sure) return;

        await dispatch(updateCinema({ data: formData })).unwrap();
        toast.success("Cập nhật phòng thành công!");
        closeForm();
    } catch (err) {
      toast.error(`Cập nhật phòng thất bại: ${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          locations={locations}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
         <button className="btn" onClick={handleUpdate}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
