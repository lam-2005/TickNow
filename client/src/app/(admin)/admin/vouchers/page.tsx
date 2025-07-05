import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
import AddVoucherBtn from '@/admin_components/VoucherManagementComponents/AddVoucher/ButtonOpenCinema';
import VoucherList from '@/admin_components/VoucherManagementComponents/VoucherList';
import { getVoucherList } from '@/services/vouchers.service';
import React, { Suspense } from 'react'

export const getVouchers = async (page: number, limit: number) => {
  const res = await getVoucherList(`?page=${page}&limit=${limit}`);
  return {
    vouchers: res?.voucher,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
  };
};

const VoucherManagement = () => {
  const vouchers = getVouchers(1, 5); 

  return (
   <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddVoucherBtn/>
      </HeadingCard>
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  )
}

export default VoucherManagement