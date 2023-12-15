import { configureStore } from '@reduxjs/toolkit';

import userReducer from  './userSlice';
import galeryReducer from  './galerySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    galery: galeryReducer,
  }
});
