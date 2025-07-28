import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddVoucherBtn from "@/admin_components/VoucherManagementComponents/AddForm/ButtonOpenForm";
import FilterVouchers from "@/admin_components/VoucherManagementComponents/FilterVouchers/FilterVouchers";
import VoucherList from "@/admin_components/VoucherManagementComponents/VoucherList";
import { getVoucherList, getVouchers } from "@/services/vouchers.service";
import React, { Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí mã khuyến mãi",
};

const VoucherManagement = async () => {
  const vouchers = await getVouchers(1, 5);
  const allVoucher = await getVoucherList();
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddVoucherBtn />
      </HeadingCard>
      <FilterVouchers voucher={allVoucher.voucher} />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  );
};

export default VoucherManagement;
