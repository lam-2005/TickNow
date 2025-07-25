import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { DataRoomReq, RoomType } from "@/interfaces/room.interface";
import {
  addRoomAPI,
  getRoom,
  getRoomData,
  updateRoomAPI,
} from "@/services/room.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RoomManagementState = ReduxInitStateDefaultType & {
  data: RoomType[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    cinemas: string;
    status: string;
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
    cinemas: "",
    status: "",
  },
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
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.rooms;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        // state.filter.cinemas = action.payload.cinema;
        // state.filter.status = action.payload.status;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // thêm
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
      })
      // sửa
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
      })
      .addCase(updateRoom.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
      });
  },
});
export default roomSlice.reducer;
export const { setInitialRooms, setFilter } = roomSlice.actions;
export const fetchRooms = createAsyncThunk(
  "roomManagement/fetchRooms",
  async (
    {
      page,
      limit,
      cinemas = "",
      status = "",
    }: { page: number; limit: number; cinemas?: string; status?: string },
    thunkAPI
  ) => {
    try {
      const data = await getRoomData(page, limit, cinemas, status);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRoom = createAsyncThunk(
  "roomManagement/addRoom",
  async (data: DataRoomReq, thunkAPI) => {
    try {
      const res = await addRoomAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateRoom = createAsyncThunk(
  "roomManagement/updateRoom",
  async ({ id, data }: { id: string; data: DataRoomReq }, thunkAPI) => {
    try {
      const res = await updateRoomAPI(id, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const showInfoRoom = createAsyncThunk(
  "roomManagement/showInfoRoom",
  async (id: string, thunkAPI) => {
    try {
      const res = await getRoom(`/${id}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
