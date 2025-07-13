import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Screening, ScreenReq } from "@/interfaces/screening.interface";
import * as screenService from "@/services/screening.service";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
export type RoomManagementState = ReduxInitStateDefaultType & {
  // dứ copy như này đổi cái kiểu của data, và filter cần lọc gì thì ghi ra và kiểu của nó là string
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
  // dữ liệu khởi tạo làm như này là đc
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

export const fetchScreen = createAsyncThunk(
  "screen/fetchScreen",
  async (
    {
      page,
      limit,
      movie = "", // các dữ liệu lọc truyền mặc định là ""
      date = "",
      status = "",
      showtype = "",
      timeStart = "",
      timeEnd = "",
    }: {
      page: number;
      limit: number;
      movie?: string; // nhó là có ? cho các cái lọc
      date?: string;
      status?: string;
      showtype?: string;
      timeStart?: string;
      timeEnd?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await screenService.getScreenData(
        // gọi tới hàm service dùng để đặt cho redux đã viết bên file service
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
      // dùng ddeeer lưu giá trị lọc
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
        state.filter.movie = action.payload.movie; // luu giá trị lọc nếu có
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
