import reduxInitStateDefault, {
  ReduxInitStateDefaultType,
} from "@/configs/reduxInitStateDefault";
import { DataPostReq, PostType } from "@/interfaces/post.interface";
import {
  addPostAPI,
  deletePostAPI,
  getPost,
  updatePostAPI,
} from "@/services/post.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RoomManagementState = ReduxInitStateDefaultType & {
  data: PostType[];
  total: number;
  currentPage: number;
  totalPages: number;
  errorAddData: string | null;
  errorUpdateData: string | null;
  filter: {
    title: string;
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
    title: "",
  },
  ...reduxInitStateDefault,
};
const postSlice = createSlice({
  name: "roomManagement",
  initialState,
  reducers: {
    setInitialPost: (state, action) => {
      state.loading = false;
      state.data = action.payload.posts;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
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
        state.filter.title = action.payload.title;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // thêm
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.errorAddData = null;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.errorAddData = action.payload as string;
      })
      //   // sửa
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.errorUpdateData = null;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.errorUpdateData = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (post: PostType) => post._id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
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
      title = "",
    }: { page: number; limit: number; title?: string },
    thunkAPI
  ) => {
    try {
      const data = await getPost(page, limit, title);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "postManagement/addPost",
  async (data: DataPostReq, thunkAPI) => {
    try {
      const res = await addPostAPI(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "postManagement/updatePost",
  async ({ id, data }: { id: string; data: DataPostReq }, thunkAPI) => {
    try {
      const res = await updatePostAPI(id, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "postManagement/deletePost",
  async (id: string, thunkAPI) => {
    try {
      await deletePostAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
