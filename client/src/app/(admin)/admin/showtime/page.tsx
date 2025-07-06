import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import * as screenService from "@/services/screening.service";
// import UserList from "../../../../admin_components/UserManagementComponents/UserList";
// import AddUserBtn from "@/admin_components/UserManagementComponents/AddForm/ButtonOpenForm";
import ScreenList from "@/admin_components/ScreenManagementComponents/ScreenList";
import AddScreenBtn from "@/admin_components/ScreenManagementComponents/AddForm/ButtonOpenForm";

const getScreenData = async (page: number, limit: number) => {
  const res = await screenService.getScreeningList(`?page=${page}&limit=${limit}`);
  return {
    Screen: res?.data.result,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const ScreenManagement = async () => {
  const res = await getScreenData(1, 5);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Suất Chi">
        <AddScreenBtn />
      </HeadingCard>
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <ScreenList initData={res} />
      </Suspense>
    </div>
  );
};

export default ScreenManagement;