import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './redux/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;