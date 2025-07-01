import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "voucher",
  initialState: { data: [], status: "loading", error: "" },
  extraReducers: (builder) => {
    builder
      // fetch api
      .addCase(fetchVouchers.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      // Thêm
      .addCase(addVoucher.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(addVoucher.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      // Sửa
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      });
  },
});

export default voucherSlice.reducer;

export const fetchVouchers = createAsyncThunk("voucher/fetchVouchers", async (params) => {
    const { rowsPerPage, currentPage } = params;
    try {
        const res = await fetch(`http://localhost:1001/voucher?limit=${rowsPerPage}&page=${currentPage}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return isRejectedWithValue(error.message);
    }
});

export const addVoucher = createAsyncThunk(
  "voucher/addVoucher",
  async ({ formData }, thunkAPI) => {
    const res = await fetch("http://localhost:1001/voucher/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
      body: JSON.stringify(formData),
    });

     if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
    }
    const data = await res.json();
    return data;
  }
);

export const updateVoucher = createAsyncThunk(
  "voucher/updateVoucher",
  async ({ formData }, thunkAPI) => {
    const res = await fetch(`http://localhost:1001/voucher/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
    }

    const data = await res.json();
    return data;
  }
);
