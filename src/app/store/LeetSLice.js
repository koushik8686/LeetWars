import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'details',
  initialState: { value: [] }, // Initial state as an array
  reducers: {
    setLeetData: (state, action) => {
      console.log('Action: setLeetData', 'Payload:', action.payload);
      state.value = action.payload; // Replace the array with new data
    },
    addLeetData: (state, action) => {
      // console.log('Action: setLeetData', 'Payload:', action.payload);
      state.value.push(action.payload);
      console.log('Updated State after addLeetData:', JSON.parse(JSON.stringify(state.value)));
    },
  },
});

export const {
  setLeetData,
  addLeetData,
} = counterSlice.actions;
export default counterSlice.reducer;
