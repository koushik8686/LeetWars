import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'details',
  initialState: { value: [] }, // Initial state as an array
  reducers: {
    setLeetData: (state, action) => {
      state.value = action.payload; // Replace the array with new data
    },
    addLeetData: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const {
  setLeetData,
  addLeetData,
} = counterSlice.actions;
export default counterSlice.reducer;
