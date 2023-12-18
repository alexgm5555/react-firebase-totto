import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  startLoading: false
};

export const loadingSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.startLoading = action.payload || false;
    },
  }
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
