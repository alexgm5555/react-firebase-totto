import { createSlice } from '@reduxjs/toolkit';
import { GaleryInterface } from '../interfaces';

const initialState: GaleryInterface = {
  img: '',
  id: ''
}

export const galerySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addGalery: (state, action) => {
      const { id, img } = action.payload
      state.id = id;
      state.img = img;
    },
  }
});

export const { addGalery} = galerySlice.actions;
export default galerySlice.reducer;
