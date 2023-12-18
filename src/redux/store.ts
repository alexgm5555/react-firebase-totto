import { configureStore } from '@reduxjs/toolkit';

import userReducer from  './userSlice';
import imagesReducer from  './imagesSlice';
import loadingReducer from  './loadingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    images: imagesReducer,
    loading: loadingReducer
  }
});
