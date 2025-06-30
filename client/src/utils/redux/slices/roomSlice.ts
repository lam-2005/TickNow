import { RoomType } from "@/interfaces/room.interface";
import { getRooom } from "@/services/room.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RoomManagementState = {
  data: RoomType[];
  total: number;
  currentPage: number;
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};
const initialState: RoomManagementState = {
  data: [],
  status: "idle",
  error: "",
  total: 0,
  currentPage: 1,
  totalPages: 1,
};
const roomSlice = createSlice({
  name: "roomManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.rooms;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = "failed";
        state.error = "Loi lay du lieu";
      });
  },
});
export default roomSlice.reducer;

export const fetchRooms = createAsyncThunk(
  "roomManagement/fetchRooms",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await getRooom(`?page=${page}&limit=${limit}`);
    return {
      rooms: res?.data.room,
      total: res?.data.pagination.total,
      currentPage: res?.data.pagination.page,
      totalPages: res?.data.pagination.totalPages,
    };
  }
);
