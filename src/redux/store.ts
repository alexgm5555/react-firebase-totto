import { configureStore } from '@reduxjs/toolkit';

import userReducer from  './userSlice';
import imagesReducer from  './imagesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    images: imagesReducer,
  }
});
