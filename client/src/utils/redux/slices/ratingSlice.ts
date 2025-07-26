// ratingSlice.ts
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
  filter: {
    movie: string;
    score: string;
    start_day: string;
    end_day: string;
  };
};

const initialState: RatingState = {
  ratings: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  filter: {
    movie: "",
    score: "",
    start_day: "",
    end_day: "",
  },
};

export const fetchRatings = createAsyncThunk(
  "ratingManagement/fetchRatings",
  async (
    {
      page,
      limit,
      movie,
      score,
      start_day,
      end_day,
    }: {
      page: number;
      limit: number;
      movie?: string;
      score?: string;
      start_day?: string;
      end_day?: string;
    },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (movie) params.append("movie", movie);
      if (score) params.append("score", score);
      if (start_day) {
        params.append("start_day", start_day);
      }
      if (end_day) {
        params.append("end_day", end_day);
      }
      const res = await rateService.getRateList(
        `?${params.toString()}&sortField=updatedAt`
      );
      return {
        ratings: res?.data.data,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return thunkAPI.rejectWithValue("Không thể tải danh sách đánh giá.");
    }
  }
);

const ratingSlice = createSlice({
  name: "ratingManagement",
  initialState,
  reducers: {
    setInitialRatings(state, action: PayloadAction<RatingState>) {
      Object.assign(state, action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
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
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialRatings, setFilter } = ratingSlice.actions;
export default ratingSlice.reducer;
