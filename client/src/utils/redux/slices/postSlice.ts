import { getPosts } from "@/app/(admin)/admin/post/page";
import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { Post } from "@/interfaces/post.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type PostManagementState = ReduxInitStateDefaultType & {
  data: Post[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    startDate: string;
    endDate: string;
    status: string;
    user: string;
  };
};

const initialState: PostManagementState = {
  data: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  errorAddData: null,
  errorUpdateData: null,
  filter: {
    startDate: "",
    endDate: "",
    status: "",
    user: "",
  },
  ...reduxInitStateDefault,
};

const postSlice = createSlice({
  name: "postManagement",
  initialState,
  reducers: {
    setInitialPost: (state, action) => {
      state.data = action.payload.posts;
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.posts;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;

export const { setInitialPost, setFilter } = postSlice.actions;

export const fetchPosts = createAsyncThunk(
  "postManagement/fetchPosts",
  async (
    {
      page,
      limit,
      startDate = "",
      endDate = "",
      status = "",
      user = "",
    }: { page: number; limit: number; startDate?: string, endDate?: string, status?: string, user?: string },
    thunkAPI
  ) => {
    try {
      const data = await getPosts(page, limit, startDate, endDate, status, user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const createCinema = createAsyncThunk(
//   "cinemaManagement/createCinema",
//   async ({ data }: { data: CinemaCreateOrUpdate }, thunkAPI) => {
//     try {
//       const res = await createCinemaService(data);
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const updateCinema = createAsyncThunk(
//   "cinemaManagement/updateCinema",
//   async ({ data }: { data: CinemaCreateOrUpdate }, thunkAPI) => {
//     try {
//       const res = await updateCinemaService(data);
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
