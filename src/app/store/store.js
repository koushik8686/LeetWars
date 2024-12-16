import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice';
const store = configureStore({
  reducer: {
    leetinfo: counterReducer,
  },
});

export default store;
