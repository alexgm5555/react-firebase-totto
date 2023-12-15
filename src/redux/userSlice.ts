import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../interfaces';

const initialState: UserInterface = {
  email: '',
  password: '',
  img: '',
  name: '',
  uuid: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, img, name, uuid } = action.payload
      state.email = email;
      state.img = img;
      state.name = name;
      state.uuid = uuid;
    },
  }
});

export const { addUser} = userSlice.actions;
export default userSlice.reducer;
