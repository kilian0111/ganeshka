import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./printError";
import usersService from "../services/user.service";


export const getUserAuth = createAsyncThunk(
    "users/me",
    async (thunkAPI) => {
        try {
            const response = await usersService.getUserAuth();
            //thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            //thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);



const usersSlice = createSlice({
    name: "users",
    initialState:{},
    extraReducers: {
        [getUserAuth.rejected]: (state, action) => {
            state = null;
            return state;
        },
        [getUserAuth.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
        [getUserAuth.rejected]: (state, action) => {
            state = null;
            return state;
        },
    },
});

const { reducer } = usersSlice ;
export default reducer;
