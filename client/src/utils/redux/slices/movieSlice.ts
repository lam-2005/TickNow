import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { MovieReq, MovieType } from "@/interfaces/movie.interface";
import * as movieService from "@/services/movie.service";

type MovieState = ReduxInitStateDefaultType & {
  data: MovieType[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    status: string;
    genre: string;
    date: string;
    star: string;
    name: string;
  };
};

const initialState: MovieState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  ...reduxInitStateDefault,
  filter: {
    status: "",
    genre: "",
    date: "",
    star: "",
    name: "",
  },
};

export const fetchMovies = createAsyncThunk(
  "movieManagement/fetchMovies",
  async (
    {
      page,
      limit,
      genre = "",
      status = "",
      date = "",
      star = "",
      name = "",
    }: {
      page: number;
      limit: number;
      genre?: string;
      status?: string;
      date?: string;
      star?: string;
      name?: string;
    },
    thunkAPI
  ) => {
    try {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("limit", limit.toString());
      if (genre && genre.length > 0) query.append("genre", genre.toString());
      if (status) query.append("status", status);
      if (date) query.append("date", date);
      if (star) query.append("star", star);
      if (name) query.append("name", name);
      const res = await movieService.getMovieList(`?${query.toString()}`);

      return {
        movies: res?.data.movie,
        total: res?.data.pagination.total,
        currentPage: res?.data.pagination.page,
        totalPages: res?.data.pagination.totalPages,
        genre: genre,
        status: status,
        date: date,
        star: star,
        name,
      };
    } catch (error) {
      console.error("Không thể tải danh sách phim:", error);
      return thunkAPI.rejectWithValue("Không thể tải danh sách phim.");
    }
  }
);

export const addMovie = createAsyncThunk(
  "movieManagement/addMovie",
  async (data: MovieReq, thunkAPI) => {
    try {
      const res = await movieService.createMovie(data);
      return res;
    } catch (error) {
      console.error("Thêm phim thất bại:", error);
      return thunkAPI.rejectWithValue("Thêm phim thất bại.");
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movieManagement/updateMovie",
  async ({ id, data }: { id: string; data: MovieReq }, thunkAPI) => {
    try {
      const res = await movieService.updateMovie(id, data);
      return res;
    } catch (error) {
      console.error("Cập nhật phim thất bại:", error);
      return thunkAPI.rejectWithValue("Cập nhật phim thất bại.");
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
      state.filter = action.payload.filter ?? {
        genre: "",
        status: "",
        date: "",
        star: "",
        name: "",
      };
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.filter.genre = action.payload.genre;
        state.filter.status = action.payload.status;
        state.filter.date = action.payload.date;
        state.filter.star = action.payload.star;
        state.filter.name = action.payload.name;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

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
      });
  },
});

export default movieSlice.reducer;
export const { setInitialMovies, setFilter } = movieSlice.actions;
