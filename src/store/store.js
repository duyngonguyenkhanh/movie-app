import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducer/movieSlice';
import searchReducer from '../reducer/searchSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    searchs: searchReducer,
  }
});

export default store;
