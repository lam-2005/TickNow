import React, { Suspense } from "react";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import * as userService from "@/services/user.service";
import UserList from "../../../../admin_components/UserManagementComponents/UserList";
import AddUserBtn from "@/admin_components/UserManagementComponents/AddForm/ButtonOpenForm";
import FilterUser from "@/admin_components/UserManagementComponents/FilterUser/FilterUser";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí người dùng",
};

const UserManagement = async () => {
  const res = userService.getUserData(1, 5);
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Người Dùng">
        <AddUserBtn />
      </HeadingCard>
      <FilterUser />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <UserList initData={res} />
      </Suspense>
    </div>
  );
};

export default UserManagement;
