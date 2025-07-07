import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
import AddVoucherBtn from '@/admin_components/VoucherManagementComponents/AddVoucher/ButtonOpenCinema';
import VoucherFilter from '@/admin_components/VoucherManagementComponents/VoucherFilter';
import VoucherList from '@/admin_components/VoucherManagementComponents/VoucherList';
import { getVoucherList } from '@/services/vouchers.service';
import React, { Suspense } from 'react'

export const getVouchers = async (page: number, limit: number, params: string|null = null) => {
  const queries = params ? `?${params}` : `?page=${page}&limit=${limit}`;
  const res = await getVoucherList(queries);
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

      <VoucherFilter />
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  )
}

export default VoucherManagement