import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Screening, ScreenReq } from "@/interfaces/screening.interface";
import * as screenService from "@/services/screening.service";

type ScreenState = {
  Screen: Screening[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  errorAddData: string | null;
  errorUpdateData: string | null;
};

const initialState: ScreenState = {
  Screen: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  errorAddData: null,
  errorUpdateData : null,
};

// export const fetchScreen = createAsyncThunk(
//   "screen/fetchScreen",
//   async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
//     try {
//       const res = await screenService.getScreeningList(`?page=${page}&limit=${limit}`);
//       return {
//         Screen: res?.data.user,
//         total: res?.data.pagination.total,
//         currentPage: res?.data.pagination.page,
//         totalPages: res?.data.pagination.totalPages,
//       };
//     } catch {
//       return thunkAPI.rejectWithValue("Không thể tải danh sách người dùng.");
//     }
//   }
// );

export const fetchScreen = createAsyncThunk(
  "screen/fetchScreen",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await screenService.getScreeningList(`?page=${page}&limit=${limit}`);
      return {
        Screen: res?.data.result, // ✅ đúng field từ API
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách suất chiếu.");
    }
  }
);

export const updateScreen = createAsyncThunk(
  "screenManagement/updateScreen",
  async ({ id, data }: { id: string; data: ScreenReq }, thunkAPI) => {
    try {
      const res = await screenService.updateScreen(id, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addScreen = createAsyncThunk(
  "screenManagement/addScreen",
  async (data: ScreenReq, thunkAPI) => {
    try {
      const res = await screenService.addScreen(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const screenSlice = createSlice({
  name: "screenManagement",
  initialState,
  reducers: {
    setInitialScreen(state, action: PayloadAction<ScreenState>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScreen.fulfilled, (state, action) => {
        state.Screen = action.payload.Screen;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // thêm
      .addCase(addScreen.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
        })
      .addCase(addScreen.fulfilled, (state) => {
        state.loading = false;
        })
      .addCase(addScreen.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
        })
      // sửa
      .addCase(updateScreen.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
        })
      .addCase(updateScreen.fulfilled, (state) => {
        state.loading = false;
        })
      .addCase(updateScreen.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
        });
  },
});

export const { setInitialScreen } = screenSlice.actions;
export default screenSlice.reducer;
