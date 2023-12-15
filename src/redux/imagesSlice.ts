import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  imageUrl: '',
  name: '',
  user_uuid: '',
  uuid: '',
  update: false
}

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setUpdate: (state) => {
      state.update = !state.update;
    },
    setImages: (state, action) => {
      console.log(action.payload);
      
      state = action.payload;
    },
  }
});

export const { setImages, setUpdate } = imagesSlice.actions;
export default imagesSlice.reducer;
