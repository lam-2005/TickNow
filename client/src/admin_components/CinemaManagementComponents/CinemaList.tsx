"use client";
import Pagination from "@/admin_components/Table/Pagination";
import Table, { Column } from "@/admin_components/Table/Table";
import usePanigation from "@/hooks/usePanigation";
import { AppDispatch } from "@/utils/redux/store";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../Button/ButtonActions";
import UpdateFormContainer from "./UpdateCinema/UpdateFormContainer";
import { Cinema, Location } from "@/interfaces/cinema.interface";
import dataCinemaSelector from "@/utils/redux/selectors/selectorCinema";
import {
  fetchCinemas,
  setInitialcinemas,
} from "@/utils/redux/slices/cinemaSlice";
import { toast } from "react-toastify";
import env from "@/configs/environment";
import Image from "next/image";

type InitDataType = {
  cinemas: Cinema[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const CinemaList = ({
  initData,
  initLocations,
}: {
  initData: Promise<InitDataType>;
  initLocations: Promise<Location[]>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = use(initData);
  const locations = use(initLocations);

  const isFirstLoad = useRef(true);
  //   const [showInfo, setShowInfo] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [cinema, setCinema] = useState<Cinema | null>(null);
  //   // lay selector
  const { data, error, total, currentPage, loading, totalPages, filter } =
    useSelector(dataCinemaSelector);
  // hook phan trang
  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initialData.currentPage
  );

  useEffect(() => {
    if (isFirstLoad.current) {
      dispatch(setInitialcinemas(initialData));
      isFirstLoad.current = false;
      return;
    }

    if (page <= totalPages) {
      dispatch(
        fetchCinemas({
          limit: rowsPerPage,
          page: page,
          name: filter.name,
          locations: filter.locations,
          status: filter.status,
        })
      );

      return;
    }

    dispatch(
      fetchCinemas({
        limit: rowsPerPage,
        page: totalPages,
        name: filter.name,
        locations: filter.locations,
        status: filter.status,
      })
    );
  }, [dispatch, rowsPerPage, page, initialData, totalPages, filter]);

  const columns: Column<Cinema>[] = [
    { key: "name", title: "Tên rạp" },
    {
      key: "location",
      title: "Địa chỉ",
      render: (row) => row.location?.deatil_location || "Chưa có địa chỉ",
    },
    {
      key: "image",
      title: "Hình ảnh",
      render: (row) =>
        row?.image ? (
          <div>
            <Image
              src={`${env.IMG_API_URL}/cinema/${row?.image}`}
              height={70}
              width={100}
              alt=""
            />
          </div>
        ) : (
          // <Image
          //   src={row.image}
          //   alt={`Ảnh ${row.name}`}
          //   width={80}
          //   height={50}
          //   className="rounded border object-cover"
          // />
          <span>Không có ảnh</span>
        ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (row) => (row?.status === 1 ? "Hoạt động" : "Ngừng hoạt động"),
    },
    {
      title: "Thao tác",
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            bgColor="warning"
            onClick={() => handleOpenUpdate(row._id)}
            label="Sửa"
          />
        </div>
      ),
    },
  ];

  const handleOpenUpdate = (id: string) => {
    const target = data.find((item) => item._id === id);
    if (!target) {
      toast.error("Không tìm thấy rạp chiếu");
      return;
    }
    setCinema(target);
    setOpenUpdateForm(true);
  };

  const handleCloseUpdate = () => {
    setCinema(null);
    setOpenUpdateForm(false);
    dispatch(fetchCinemas({ limit: rowsPerPage, page: 1 }));
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {openUpdateForm && cinema && (
        <UpdateFormContainer
          cinema={cinema}
          locations={locations}
          closeForm={handleCloseUpdate}
        />
      )}

      <Table
        column={columns}
        data={data}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />

      {total >= rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          total={total}
          totalPages={totalPages}
          rowPerPage={rowsPerPage}
          setPage={changePage}
          setRowPerPage={changeRowPerPage}
        />
      )}
    </>
  );
};

export default CinemaList;
