import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { RoomType } from "@/interfaces/room.interface";
import { getRooom } from "@/services/room.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RoomManagementState = ReduxInitStateDefaultType & {
  data: RoomType[];
  total: number;
  currentPage: number;
  totalPages: number;
};
const initialState: RoomManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  ...reduxInitStateDefault,
};
const roomSlice = createSlice({
  name: "roomManagement",
  initialState,
  reducers: {
    setInitialRooms: (state, action) => {
      state.data = action.payload.rooms;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.rooms;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default roomSlice.reducer;
export const { setInitialRooms } = roomSlice.actions;
export const fetchRooms = createAsyncThunk(
  "roomManagement/fetchRooms",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await getRooom(`?page=${page}&limit=${limit}`);

      return {
        rooms: res?.data.room,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
