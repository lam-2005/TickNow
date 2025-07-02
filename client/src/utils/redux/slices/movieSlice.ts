import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";

type MovieState = ReduxInitStateDefaultType & {
  data: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
};

const initialState: MovieState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  ...reduxInitStateDefault,
};
// Thunks
export const fetchMovies = createAsyncThunk(
  "movieManagement/fetchMovies",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const res = await movieService.getMovieList(`?page=${page}&limit=${limit}`);
      return {
        movies: res?.data.movie,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
      };
    } catch (error) {
      console.log("Error fetching movies:", error);
      return thunkAPI.rejectWithValue("Không thể tải danh sách phim.");
    }
  }
);

export const addMovie = createAsyncThunk(
  "movieManagement/addMovie",
  async (data: Partial<MovieType>, thunkAPI) => {
    try {
      const res = await movieService.createMovie(data);
      return res;
    } catch (error) {
      console.log("Error adding movie:", error);
      return thunkAPI.rejectWithValue("Thêm phim thất bại.");
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movieManagement/updateMovie",
  async ({ id, data }: { id: string; data: Partial<MovieType> }, thunkAPI) => {
    try {
      const res = await movieService.updateMovie(id, data);
      return res;
    } catch (error) {
      console.log("Error updating movie:", error);
      return thunkAPI.rejectWithValue("Cập nhật phim thất bại.");
    }
  }
);
export const deleteMovie = createAsyncThunk(
  "movieManagement/deleteMovie",
  async (id: string, thunkAPI) => {
    try {
      await movieService.deleteMovie(id);
      return id;
    } catch (error) {
      console.log("Error deleting movie:", error);
      return thunkAPI.rejectWithValue("Xoá phim thất bại.");
    }
  }
);
const movieSlice = createSlice({
  name: "movieManagement",
  initialState,
  reducers: {
    setInitialMovies(state, action: PayloadAction<MovieState>) {
      state.data = action.payload.data;
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
      // Fetch
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.movies;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
      })

      // Update
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
      })
      // Delete
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((movie) => movie._id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
export const { setInitialMovies } = movieSlice.actions;



