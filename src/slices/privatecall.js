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
const privateCallByIdSlice = createSlice({
  name: "privateCall",
  initialState: null,
  extraReducers: {
    [getPrivateCallById.fulfilled]: (state, action) => {
      console.log("fulfilled", state);
      state.privateCall = action.payload;
      return state;
    },
    [getPrivateCallById.rejected]: (state, action) => {
      console.log("rejected", state);
      state.privateCall = null;
      return state;
    },
  },
});

const { reducer } = privateCallByIdSlice;
export default reducer;
