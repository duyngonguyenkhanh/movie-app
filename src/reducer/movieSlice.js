import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../custom/apiEndpots";

// Thunk này được sử dụng để gọi API và lấy trailer key dựa trên ID của phim.
export const fetchTrailerKey = createAsyncThunk(
  'movies/fetchTrailerKey',
  async (id, { rejectWithValue }) => {
    try {
      // Gọi API để lấy thông tin video của phim.
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );

      // Kiểm tra xem response có thành công không.
      if (!response.ok) {
        throw new Error('Failed to fetch trailer data');
      }

      // Parse response data thành JSON.
      const data = await response.json();
    
      // Lọc kết quả để chỉ lấy trailers hoặc teasers từ YouTube.
      const filteredResults = data.results
        .filter(result => result.type === 'Trailer' || result.type === 'Teaser')
        .filter(result => result.site === 'YouTube');

      // Nếu tìm thấy trailer, trả về key của trailer đầu tiên.
      if (filteredResults.length > 0) {
        return filteredResults[0].key;
      } else {
        throw new Error('No trailer found');
      }
    } catch (error) {
      // Nếu có lỗi, trả về lỗi thông qua rejectWithValue.
      return rejectWithValue(error.message);
    }
  }
);

// Tạo một slice với tên 'movies', state ban đầu và reducers.
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    key: null, // Key của trailer, ban đầu là null.
    error: null, // Lưu trữ thông báo lỗi, ban đầu là null.
    status: 'idle' // Trạng thái của slice, ban đầu là 'idle'.
  },
  reducers: {
    // Reducer để reset state về giá trị ban đầu.
    resetState: (state) =>{
      state.key = null;
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    // Xử lý các trạng thái của async thunk.
    builder
      .addCase(fetchTrailerKey.pending, (state) => {
        // Khi bắt đầu gọi API, đặt trạng thái là 'loading'.
        state.status = 'loading';
      })
      .addCase(fetchTrailerKey.fulfilled, (state, action) => {
        // Khi gọi API thành công, cập nhật state với key mới và đặt trạng thái là 'succeeded'.
        state.status = 'succeeded';
        state.key = action.payload;
        state.error = null;
      })
      .addCase(fetchTrailerKey.rejected, (state, action) => {
        // Khi gọi API thất bại, cập nhật state với lỗi và đặt trạng thái là 'failed'.
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export action resetState để có thể sử dụng nó trong các components.
export const {resetState} = movieSlice.actions;

// Export reducer để sử dụng trong store của Redux.
export default movieSlice.reducer;
