import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './LeetSlice'; // Example reducer

const store = configureStore({
  reducer: {
    leetinfo: counterReducer,
  },
});

export default store;
