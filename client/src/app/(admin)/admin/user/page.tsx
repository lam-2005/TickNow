import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import * as userService from "@/services/user.service";
import UserList from "../../../../admin_components/UserManagementComponents/UserList";
import AddUserBtn from "@/admin_components/UserManagementComponents/AddForm/ButtonOpenForm";
import FilterUser from "@/admin_components/UserManagementComponents/FilterUser/FilterUser";

const getUserData = async (page: number, limit: number) => {
  const res = await userService.getUserList(`?page=${page}&limit=${limit}`);
  return {
    users: res?.data.user,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

const UserManagement = async () => {
  const res = await getUserData(1, 5);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Người Dùng">
        <AddUserBtn />
      </HeadingCard>
      <FilterUser />
      <OptionTable />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <UserList initData={res} />
      </Suspense>
    </div>
  );
};

export default UserManagement;
