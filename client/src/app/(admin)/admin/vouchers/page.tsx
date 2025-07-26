import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddVoucherBtn from "@/admin_components/VoucherManagementComponents/AddForm/ButtonOpenForm";
import FilterVouchers from "@/admin_components/VoucherManagementComponents/FilterVouchers/FilterVouchers";
import VoucherList from "@/admin_components/VoucherManagementComponents/VoucherList";
import { getVouchers } from "@/services/vouchers.service";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Quản lí mã khuyến mãi",
};

const VoucherManagement = async () => {
  const vouchers = await getVouchers(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddVoucherBtn />
      </HeadingCard>
      <FilterVouchers />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  );
};

export default VoucherManagement;
