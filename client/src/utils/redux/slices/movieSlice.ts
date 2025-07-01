import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";

type MovieState = {
  movies: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const initialState: MovieState = {
  movies: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await movieService.getMovieList(`?page=${page}&limit=${limit}`);
      return {
        movies: res?.data.movie,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch {
      return thunkAPI.rejectWithValue("Không thể tải danh sách phim.");
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setInitialMovies(state, action: PayloadAction<MovieState>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialMovies } = movieSlice.actions;
export default movieSlice.reducer;
