"use client";
import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { CinemaReq, LocationType } from "@/interfaces/cinema.interface";
import { getCinemaDetail } from "@/services/cinema.service";
import { fetchCinema, updateCinema } from "@/utils/redux/slices/cinemaSlice";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import dataCinema from "@/utils/redux/selectors/selectorCinema";
import usePanigation from "@/hooks/usePanigation";
import { toast } from "react-toastify";

const UpdateForm = ({
  id,
  locations,
  closeForm,
}: {
  id: string;
  locations: LocationType[];
  closeForm: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, filter } = useSelector(dataCinema);
  const { rowsPerPage } = usePanigation(currentPage);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CinemaReq>({
    name: "",
    image: "",
    status: 1,
    id_location: "",
    deatil_location: "",
  });

  useEffect(() => {
    const fetchCinema = async (id: string) => {
      try {
        const data = await getCinemaDetail(id);
        const location = data.location || {};

        setFormData({
          name: data.name || "",
          image: data.image || "",
          status: data.status ?? 1, // dùng nullish để tránh undefined
          id_location: location.id_location || "",
          deatil_location: location.deatil_location || "",
        });
      } catch (error) {
        toast.error("Không thể tải chi tiết rạp");
        console.error("Lỗi khi tải chi tiết rạp:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinema(id);
  }, [id]);

  const handleUpdateCinema = async (id: string) => {
    const name = (formData.name || "").trim();
    const detailLocation = (formData.deatil_location || "").trim();

    if (!name || !formData.id_location || !detailLocation) {
      toast.error("Vui lòng điền đầy đủ thông tin tên rạp và địa chỉ.");
      return;
    }

    try {
      const confirmUpdate = confirm("Bạn có muốn cập nhật rạp này?");
      if (!confirmUpdate) return;

      const payload: CinemaReq = {
        ...formData,
        name,
        deatil_location: detailLocation,
      };

      await dispatch(updateCinema({ id, data: payload })).unwrap();
      toast.success("Cập nhật rạp thành công!");

      await dispatch(
        fetchCinema({
          page: currentPage,
          limit: rowsPerPage,
          name: filter.name,
          location: filter.location,
          status: filter.status,
        })
      );

      closeForm();
    } catch (err) {
      toast.error("Cập nhật rạp thất bại");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center p-5">Đang tải...</p>;

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
        <button className="btn" onClick={() => handleUpdateCinema(id)}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
