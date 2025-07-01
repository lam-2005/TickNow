export const voucherDataSelector = (state) => state.voucherCrud.data?.data?.voucher;
export const voucherTotalSelector = (state) => state.voucherCrud.data?.data?.pagination?.total || 0;
export const voucherStatusSelector = (state) => state.voucherCrud.status;
export const voucherErrorSelector = (state) => state.voucherCrud.error;
