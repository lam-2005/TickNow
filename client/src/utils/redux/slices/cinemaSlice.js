import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: { data: [], status: "loading", error: "" },
  extraReducers: (builder) => {
    builder
      // fetch api
      .addCase(fetchCinemas.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      // Thêm
      .addCase(addCinema.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(addCinema.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      })
      // Sửa
      .addCase(updateCinema.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(updateCinema.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      });
  },
});

export default cinemaSlice.reducer;

export const fetchCinemas = createAsyncThunk("cinema/fetchCinemas", async (params) => {
    const { rowsPerPage, currentPage } = params;
    try {
        const res = await fetch(`http://localhost:1001/cinema?limit=${rowsPerPage}&page=${currentPage}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return isRejectedWithValue(error.message);
    }
});

export const addCinema = createAsyncThunk(
  "cinema/addCinema",
  async ({ formData }, thunkAPI) => {
    const res = await fetch("http://localhost:1001/cinema/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
      body: JSON.stringify(formData),
    });

     if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
    }
    const data = await res.json();
    return data;
  }
);

export const updateCinema = createAsyncThunk(
  "cinema/updateCinema",
  async ({ formData }, thunkAPI) => {
    const res = await fetch(`http://localhost:1001/cinema/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
    }

    const data = await res.json();
    return data;
  }
);
