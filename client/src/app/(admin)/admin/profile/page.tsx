import EditPassword from "@/admin_components/EditProfileForm/EditPassword";
import EditProfile from "@/admin_components/EditProfileForm/EditProfile";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import { userInfoAPI } from "@/services/user.service";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thông tin cá nhân",
};

const ProfileUser = async () => {
  const cookieStore = cookies();
  const tokenAdmin = (await cookieStore).get("tokenAdmin")?.value || "";
  let userInfo = null;
  if (tokenAdmin) {
    try {
      const res = await userInfoAPI(tokenAdmin);
      userInfo = res?.data;
    } catch (error) {
      console.error(error);
    }
  }
  if (!userInfo) {
    alert("Có lỗi khi lấy thông tin người dùng!");
  }

  return (
    <div className="card">
      <HeadingCard title="Thông tin người dùng"></HeadingCard>
      <EditProfile Info={userInfo} tokenAdmin={tokenAdmin} />
      <hr />
      <EditPassword Info={userInfo} />
    </div>
  );
};

export default ProfileUser;
