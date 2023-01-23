import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/printError";
import usersReducer from "../slices/user";
import postReducer from "../slices/post";
import privateMessage from "../slices/privatemessage";
import privateCall from "../slices/privatecall";
import privateCalls from "../slices/privatecall";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  users: usersReducer,
  posts: postReducer,
  privateMessage: privateMessage,
  privateCall: privateCall,
  privateCalls: privateCalls,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
