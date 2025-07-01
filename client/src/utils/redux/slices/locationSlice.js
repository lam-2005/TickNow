import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: { data: [], status: "loading", error: "" },
  extraReducers: (builder) => {
    builder
      // fetch api
      .addCase(fetchLocations.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Co loi xay ra";
      });
  },
});

export default locationSlice.reducer;

export const fetchLocations = createAsyncThunk("localtion/fetchLocations", async () => {
    try {
        const res = await fetch('http://localhost:1001/location');
        const data = await res.json();
        return data;
    } catch (error) {
        return isRejectedWithValue(error.message);
    }
});
