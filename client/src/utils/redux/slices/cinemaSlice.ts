import { getCinemas } from "@/app/(admin)/admin/cinema/page";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { Cinema, CinemaCreateOrUpdate } from "@/interfaces/cinema.interface";
import { 
  updateCinema as updateCinemaService, 
  createCinema as createCinemaService,
} from "@/services/cinema.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type CinemaManagementState = ReduxInitStateDefaultType & {
  data: Cinema[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
};
const initialState: CinemaManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  ...reduxInitStateDefault,
};
const cinemaSlice = createSlice({
  name: "cinemaManagement",
  initialState,
  reducers: {
    setInitialcinemas: (state, action) => {
      state.data = action.payload.cinemas;
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
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.cinemas;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    //   // thêm
    //   .addCase(addcinema.pending, (state) => {
    //     state.loading = true;
    //     state.errorAddData = null;
    //   })
    //   .addCase(addcinema.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(addcinema.rejected, (state, action) => {
    //     state.loading = false;
    //     state.errorAddData = action.payload as string;
    //   })
    //   // sửa
    //   .addCase(updatecinema.pending, (state) => {
    //     state.loading = true;
    //     state.errorUpdateData = null;
    //   })
    //   .addCase(updatecinema.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(updatecinema.rejected, (state, action) => {
    //     state.loading = false;
    //     state.errorUpdateData = action.payload as string;
    //   });
  },
});
export default cinemaSlice.reducer;
export const { setInitialcinemas } = cinemaSlice.actions;
export const fetchCinemas = createAsyncThunk(
  "cinemaManagement/fetchCinemas",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const data = await getCinemas(page, limit);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCinema = createAsyncThunk(
  "cinemaManagement/createCinema",
  async ({ data }: { data: CinemaCreateOrUpdate }, thunkAPI) => {
    try {
      const res = await createCinemaService(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCinema = createAsyncThunk(
  "cinemaManagement/updateCinema",
  async ({ data }: { data: CinemaCreateOrUpdate }, thunkAPI) => {
    try {
      const res = await updateCinemaService(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
