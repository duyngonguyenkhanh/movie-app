import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../custom/apiEndpots";

// Thunk để gọi API lấy trailer key
export const fetchSearch = createAsyncThunk(
  "searchs/fetchSearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trailer data");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data;
      } else {
        throw new Error("No trailer found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "searchs",
  initialState: {
    res: null,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.res = action.payload;
        state.error = null;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
