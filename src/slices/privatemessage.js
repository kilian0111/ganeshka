import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateMessageService from "../services/privateMessage.service";

const token = localStorage.getItem("access_token");

export const getPrivateMessage = createAsyncThunk(
    "privateMessage",
    async (thunkAPI) => {
        try {
            const response = await privateMessageService.getAllPrivateMessage();

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

const privateMessageSlice = createSlice({
    name: "privateMessage",
    initialState: {message: null},
    extraReducers: {
        [getPrivateMessage.fulfilled]: (state, action) => {
            state.message = action.payload;
            return state
        },
        [getPrivateMessage.rejected]: (state, action) => {
            state.message = null;
            return state
        },
    },
});

const { reducer } = privateMessageSlice ;
export default reducer;
