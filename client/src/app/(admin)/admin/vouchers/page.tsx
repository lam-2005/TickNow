import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
import AddVoucherBtn from '@/admin_components/VoucherManagementComponents/AddVoucher/ButtonOpenCinema';
import FilterVouchers from '@/admin_components/VoucherManagementComponents/FilterVouchers/FilterVouchers';
// import VoucherFilter from '@/admin_components/VoucherManagementComponents/VoucherFilter';
import VoucherList from '@/admin_components/VoucherManagementComponents/VoucherList';
import { getVoucherList } from '@/services/vouchers.service';
import React, { Suspense } from 'react'

export const getVouchers = async (
  page: number,
  limit: number,
  code: string|null = null,
  timeStart: string|null = null,
  timeEnd: string|null = null,
  status: string|null = null,
  ) => {

  let queries = `?page=${page}&limit=${limit}`;

  if (code) {
    queries += `&code=${code}`;
  }

  if (timeStart) {
    queries += `&timeStart=${timeStart}`;
  }

  if (timeEnd) {
    queries += `&timeEnd=${timeEnd}`;
  }

  if (status) {
    queries += `&status=${status}`;
  }

  const res = await getVoucherList(queries);
  return {
    vouchers: res?.voucher,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
    code: code,
    timeStart: timeStart,
    timeEnd: timeEnd,
    status: status,
  };
};

const VoucherManagement = () => {
  const vouchers = getVouchers(1, 5); 

  return (
   <div className="card">
      <HeadingCard title="Quản Lý Voucher">
        <AddVoucherBtn/>
      </HeadingCard>

      <FilterVouchers />
      {/* <OptionTable /> */}
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <VoucherList initData={vouchers} />
      </Suspense>
    </div>
  )
}

export default VoucherManagement