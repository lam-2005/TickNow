// utils/redux/slices/ratingSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewType } from "@/interfaces/rating.interface";
import * as rateService from "@/services/rate.service";

type RatingState = {
  ratings: ReviewType[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const initialState: RatingState = {
  ratings: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

// Async fetch đánh giá từ server
export const fetchRatings = createAsyncThunk(
  "ratingManagement/fetchRatings",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await rateService.getRateList(`?page=${page}&limit=${limit}`);
      return {
        ratings: res?.data.rate,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const ratingSlice = createSlice({
  name: "ratingManagement",
  initialState,
  reducers: {
    setInitialRatings(state, action: PayloadAction<RatingState>) {
      state.ratings = action.payload.ratings;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.ratings = action.payload.ratings;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
