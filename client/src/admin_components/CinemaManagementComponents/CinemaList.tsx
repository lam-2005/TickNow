"use client";
import React, { useEffect, useRef, useState } from "react";
import Table, { Column } from "@/admin_components/Table/Table";
import Pagination from "@/admin_components/Table/Pagination";
import { CinemaRes } from "@/interfaces/cinema.interface";
import ActionButton from "@/admin_components/Button/ButtonActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import dataCinema from "@/utils/redux/selectors/selectorCinema";
import {
  fetchCinema,
  setInitialCinema,
} from "@/utils/redux/slices/cinemaSlice";
import usePanigation from "@/hooks/usePanigation";
import UpdateFormContainer from "./UpdateForm/UpdateFormContainer";
import Status from "../StatusUI/Status";
import { LocationType } from "@/interfaces/cinema.interface";
import Image from "next/image";
import env from "@/configs/environment";

type InitDataType = {
  Cinema: CinemaRes[];
  total: number;
  currentPage: number;
  totalPages: number;
};

const CinemaList = ({
  initData,
  locations,
}: {
  initData: InitDataType;
  locations: LocationType[];
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [idCinema, setIdCinema] = useState("");

  const { data, total, currentPage, totalPages, loading, error, filter } =
    useSelector(dataCinema);

  const { page, changePage, changeRowPerPage, rowsPerPage } = usePanigation(
    initData.currentPage
  );

  useEffect(() => {
    dispatch(setInitialCinema(initData));
  }, [dispatch, initData]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (page <= totalPages) {
      dispatch(
        fetchCinema({
          limit: rowsPerPage,
          page: page,
          name: filter.name,
          location: filter.location,
          status: filter.status,
        })
      );
    } else {
      dispatch(
        fetchCinema({
          limit: rowsPerPage,
          page: totalPages,
          name: filter.name,
          location: filter.location,
          status: filter.status,
        })
      );
    }
  }, [
    dispatch,
    page,
    rowsPerPage,
    totalPages,
    filter.name,
    filter.location,
    filter.status,
  ]);

  const handleOpenUpdate = (id: string) => {
    setIdCinema(id);
    setOpenUpdateForm(true);
  };

  const col: Column<CinemaRes>[] = [
    {
      key: "name",
      title: "Tên rạp",
      render(row) {
        return (
          <p className="line-clamp-1" title={row.name}>
            {row.name}
          </p>
        );
      },
    },
    {
      key: "location",
      title: "Vị trí",
      render(row) {
        return (
          <p>
            {row.location?.location || ""} - {row.location?.deatil_location}
          </p>
        );
      },
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
          <span>Không có ảnh</span>
        ),
    },
    {
      key: "status",
      title: "Trạng Thái",
      render: (row) => (
        <Status
          title={row.status === 2 ? "Đang hoạt động" : "Ngưng hoạt Động"} 
          color={row.status === 2 ? "success" : "error"} 
        />
      ),
    },
    {
      title: "Thao tác",
      render(row: CinemaRes) {
        return (
          <div className="flex gap-2">
            <ActionButton
              label="Sửa"
              bgColor="warning"
              onClick={() => handleOpenUpdate(row._id)}
            />
          </div>
        );
      },
    },
  ];

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Table column={col} data={data} />
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
      {openUpdateForm && idCinema && (
        <UpdateFormContainer
          id={idCinema}
          locations={locations}
          closeForm={() => setOpenUpdateForm(false)}
        />
      )}
    </>
  );
};

export default CinemaList;
