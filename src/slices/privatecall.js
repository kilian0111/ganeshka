import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateCallService from "../services/privateCall.service";

const token = localStorage.getItem("access_token");

export const getPrivateCall = createAsyncThunk(
  "privateCall",
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
      console.log(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const privateCallSlice = createSlice({
  name: "privateCall",
  initialState: { conversation: null },
  reducers: {
    addConversation: (state, action) => {
      state.conversation.push(action.payload);
      return state;
    },
  },
  extraReducers: {
    [getPrivateCall.fulfilled]: (state, action) => {
      console.log("fulfilled", state);
      state.conversation = action.payload;
      return state;
    },
    [getPrivateCall.rejected]: (state, action) => {
      console.log("rejected", state);
      state.conversation = null;
      return state;
    },
  },
});

export const { addConversation } = privateCallSlice.actions;
const { reducer } = privateCallSlice;
export default reducer;
