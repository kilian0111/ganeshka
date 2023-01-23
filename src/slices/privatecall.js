import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateCallService from "../services/privateCall.service";
import { setMessage } from "./printError";

export const getPrivateCallById = createAsyncThunk(
  "privateCall",
  async (id_privateCall, thunkAPI) => {
    try {
      const response = await privateCallService.getConversationById(
        id_privateCall
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllPrivateCall = createAsyncThunk(
  "privateCalls",
  async (id_privateCall, thunkAPI) => {
    try {
      const response = await privateCallService.getConversation(id_privateCall);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
const privateCallByIdSlice = createSlice({
  name: "privateCallById",
  initialState: { conversation: null },
  reducers: {
    addConversation: (state, action) => {
      state.conversation.push(action.payload);
      return state;
    },
  },
  extraReducers: {
    [getPrivateCallById.fulfilled]: (state, action) => {
      state.conversation = action.payload;
      return state;
    },
    [getPrivateCallById.rejected]: (state, action) => {
      state.conversation = null;
      return state;
    },
    [getAllPrivateCall.fulfilled]: (state, action) => {
      state.conversation = action.payload;
      return state;
    },
    [getAllPrivateCall.rejected]: (state, action) => {
      state.conversation = null;
      return state;
    },
  },
});

const { reducer } = privateCallByIdSlice;
export default reducer;
