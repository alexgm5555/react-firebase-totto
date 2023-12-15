import { createSlice } from '@reduxjs/toolkit';
import { ImagesInterface } from '../interfaces';

const initialState: [ImagesInterface] = [{
  imageUrl: '',
  name: '',
  user_uuid: '',
  uuid: ''
}]

export const imagesSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addImages: (state, action) => {
    //   const { imgUrl, name, user_uuid, uuid } = action.payload
    //   state.imgUrl = imgUrl;
    //   state.name = name;
    //   state.user_uuid = user_uuid;
    //   state.uuid = uuid;
    // },
    setImages: (state, action) => {
      state = action.payload;
    },
  }
});

export const { setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
