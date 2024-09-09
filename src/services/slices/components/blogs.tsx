import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../../http/baseUrl'
import { startLoadingActivity, stopLoadingActivity } from "../acitivity/activitySlice";

export const createPosts = createAsyncThunk(
    '/createPosts',
    async (data: any, { dispatch }) => {
        dispatch(startLoadingActivity())
        try {
            const response = await http.post('/post/createPost', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
)

export const getPosts = createAsyncThunk(
    '/getPosts',
    async () => {
        try {
            const response = await http.get(`/post/getPost`)
            if (response.status === 200) {
                return response.data
            }
        } catch (error: any) {
            console.error("Error", error);
        }

    }
)

export interface Post {
    loading: boolean;
    posts: any[];
}

const initialState: Post = {
    loading: false,
    posts: []
}

export const postSlice = createSlice({
    name: "Post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(createPosts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload || [];

            })
            .addCase(getPosts.rejected, (state) => {
                state.loading = false;
            })
    }
});

export default postSlice.reducer