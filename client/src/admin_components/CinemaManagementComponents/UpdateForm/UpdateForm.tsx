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
import { useConfirm } from "@/hooks/contexts/useConfirm";

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
  const confirm = useConfirm();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CinemaReq>({
    name: "",
    image: "",
    status: 1,
  });

  useEffect(() => {
    const fetchCinema = async (id: string) => {
      try {
        const data = await getCinemaDetail(id);
        setFormData({
          name: data.name || "",
          image: data.image || "",
          status: data.status,
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
    try {
      const confirmUpdate = await confirm({
        title: "Bạn có muốn cập nhật rạp này?",
        content: "Hành động này sẽ không thể hoàn tác",
      });
      if (!confirmUpdate) return;
      const dataToUpdate = {
        ...formData,
        image: formData.image ? formData.image : "",
      };
      await dispatch(updateCinema({ id: id, data: dataToUpdate })).unwrap();
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
      toast.error(`Cập nhật rạp thất bại ${err}`);
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
