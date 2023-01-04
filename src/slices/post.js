import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./printError";
import postService from "../services/post.service";

const token = localStorage.getItem("access_token");

export const getPost = createAsyncThunk(
    "posts/me",
    async ({ token }, thunkAPI) => {
        try {
            const response = await postService.getAllPost(token);
            //thunkAPI.dispatch(setMessage(response.data.message));

            return response;

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


const postsSlice = createSlice({
    name: "posts",
    initialState: null,
    extraReducers: {
        [getPost.fulfilled]: (state, action) => {
            state = action.payload;
            return state
        },
        [getPost.rejected]: (state, action) => {
            state = null;
            return state
        },
    },
});

const { reducer } = postsSlice ;
export default reducer;
