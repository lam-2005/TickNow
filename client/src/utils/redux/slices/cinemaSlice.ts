import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CinemaRes, CinemaReq } from "@/interfaces/cinema.interface";
import * as cinemaService from "@/services/cinema.service";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";

export type CinemaManagementState = ReduxInitStateDefaultType & {
  data: CinemaRes[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    name: string;
    location: string;
    status: string;
  };
};

const initialState: CinemaManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  filter: {
    name: "",
    location: "",
    status: "",
  },
  ...reduxInitStateDefault,
};

export const fetchCinema = createAsyncThunk(
  "cinema/fetchCinema",
  async (
    {
      page,
      limit,
      name = "",
      location = "",
      status = "",
    }: {
      page: number;
      limit: number;
      name?: string;
      location?: string;
      status?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await cinemaService.getCinemaData(
        page,
        limit,
        name,
        location,
        status
      );
      return res;
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách rạp chiếu.");
    }
  }
);

export const addCinema = createAsyncThunk(
  "cinema/addCinema",
  async (data: CinemaReq, thunkAPI) => {
    try {
      const res = await cinemaService.addCinema(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCinema = createAsyncThunk(
  "cinema/updateCinema",
  async ({ id, data }: { id: string; data: CinemaReq }, thunkAPI) => {
    try {
      const res = await cinemaService.updateCinema(id, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinemaManagement",
  initialState,
  reducers: {
    setInitialCinema(state, action) {
      state.loading = false;
      state.data = action.payload.Cinema;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.error = null;
      state.errorAddData = null;
      state.errorUpdateData = null;
    },
    setFilterCinema: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinema.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinema.fulfilled, (state, action) => {
        state.data = action.payload.Cinema;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
        state.filter.name = action.payload.name;
        state.filter.location = action.payload.location;
        state.filter.status = action.payload.status;
      })
      .addCase(fetchCinema.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addCinema.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
      })
      .addCase(addCinema.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCinema.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
      })

      .addCase(updateCinema.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
      })
      .addCase(updateCinema.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCinema.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
      });
  },
});

export const { setInitialCinema, setFilterCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
