import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Screening, ScreenReq } from "@/interfaces/screening.interface";
import * as screenService from "@/services/screening.service";
import { getScreenData } from "@/app/(admin)/admin/showtime/page";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
export type RoomManagementState = ReduxInitStateDefaultType & {
  data: Screening[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    movie: string;
    date: string;
    status: string;
    showtype: string;
    timeStart: string;
    timeEnd: string;
  };
};
const initialState: RoomManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  filter: {
    movie: "",
    date: "",
    status: "",
    showtype: "",
    timeStart: "",
    timeEnd: "",
  },
  ...reduxInitStateDefault,
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
  async (
    {
      page,
      limit,
      movie = "",
      date = "",
      status = "",
      showtype = "",
      timeStart = "",
      timeEnd = "",
    }: {
      page: number;
      limit: number;
      movie?: string;
      date?: string;
      status?: string;
      showtype?: string;
      timeStart?: string;
      timeEnd?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getScreenData(
        page,
        limit,
        movie,
        date,
        status,
        showtype,
        timeStart,
        timeEnd
      );
      return res;
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
    setInitialScreen(state, action) {
      state.loading = false;
      state.data = action.payload.Screen;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.error = null;
      state.errorAddData = null;
      state.errorUpdateData = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScreen.fulfilled, (state, action) => {
        state.data = action.payload.Screen;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
        state.filter.movie = action.payload.movie;
        state.filter.date = action.payload.date;
        state.filter.status = action.payload.status;
        state.filter.showtype = action.payload.showtype;
        state.filter.timeStart = action.payload.timeStart;
        state.filter.timeEnd = action.payload.timeEnd;
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

export const { setInitialScreen, setFilter } = screenSlice.actions;
export default screenSlice.reducer;
