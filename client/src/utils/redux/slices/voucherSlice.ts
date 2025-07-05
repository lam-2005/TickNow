import { getVouchers } from "@/app/(admin)/admin/vouchers/page";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { Voucher } from "@/interfaces/vouchers.interface";
import { createVoucherService, updateVoucherService } from "@/services/vouchers.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type voucherManagementState = ReduxInitStateDefaultType & {
  data: Voucher[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
};
const initialState: voucherManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  ...reduxInitStateDefault,
};

const voucherSlice = createSlice({
  name: "voucherManagement",
  initialState,
  reducers: {
    setInitialVouchers: (state, action) => {
      state.data = action.payload.vouchers;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
      state.error = null;
      state.errorAddData = null;
      state.errorUpdateData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.vouchers;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export default voucherSlice.reducer;
export const { setInitialVouchers } = voucherSlice.actions;

export const fetchVouchers = createAsyncThunk(
  "voucherManagement/fetchVouchers",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const data = await getVouchers(page, limit);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createVoucher = createAsyncThunk(
  "voucherManagement/createVoucher",
  async ({ data }: { data: Voucher }, thunkAPI) => {
    try {
      const res = await createVoucherService(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateVoucher = createAsyncThunk(
  "voucherManagement/updateVoucher",
  async ({ data }: { data: Voucher }, thunkAPI) => {
    try {
      const res = await updateVoucherService(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
