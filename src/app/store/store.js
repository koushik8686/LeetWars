import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './LeetSLice'; // Example reducer

const store = configureStore({
  reducer: {
    leetinfo: counterReducer,
  },
});

export default store;
