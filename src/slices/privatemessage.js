import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateMessageService from "../services/privateMessage.service";

const token = localStorage.getItem("access_token");

export const getPrivateMessage = createAsyncThunk(
    "privateMessage",
    async (id_privateCall, thunkAPI) => {
        try {
            const response = await privateMessageService.getAllPrivateMessage(id_privateCall);

            return response.data;

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue();
        }
    }
);

const privateMessageSlice = createSlice({
    name: "privateMessage",
    initialState: {message: null},
    reducers: {
        addMessage: (state, action) => {
            state.message.push(action.payload);
            return state
        }
    },
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

export const { addMessage } = privateMessageSlice.actions;
const { reducer } = privateMessageSlice ;
export default reducer;
