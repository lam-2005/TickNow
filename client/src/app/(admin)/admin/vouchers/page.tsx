import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddVoucherBtn from "@/admin_components/VoucherManagementComponents/AddVoucher/ButtonOpenCinema";
import FilterVouchers from "@/admin_components/VoucherManagementComponents/FilterVouchers/FilterVouchers";
// import VoucherFilter from '@/admin_components/VoucherManagementComponents/VoucherFilter';
import VoucherList from "@/admin_components/VoucherManagementComponents/VoucherList";
import { getVouchers } from "@/services/vouchers.service";
import React, { Suspense } from "react";

const VoucherManagement = () => {
  const vouchers = getVouchers(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddVoucherBtn />
      </HeadingCard>

      <FilterVouchers />
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  );
};

export default VoucherManagement;
