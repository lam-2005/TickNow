import AuthAdminForm from "@/admin_components/AuthAdminForm";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-background-card w-[500px] h-fit p-7.25  shadow-xl  rounded-[10px]">
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <Image
            src={"/logo/logo.webp"}
            alt="logo-TickNow"
            width={150}
            height={50}
            style={{ height: "50px", width: "150px", objectFit: "contain" }}
            priority
          />
        </div>
        <p className="text-xl font-bold my-5 text-foreground">
          Đăng nhập vào trang quản trị của TickNow
        </p>
        <AuthAdminForm />
      </div>
    </div>
  );
};

export default LoginPage;
