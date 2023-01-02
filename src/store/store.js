import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import usersReducer from "../slices/user";
import postReducer from "../slices/post";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  usersSlice: usersReducer,
  posts: postReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
