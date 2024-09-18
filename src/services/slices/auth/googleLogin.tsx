import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl";
import { startLoadingActivity, stopLoadingActivity } from "../acitivity/activitySlice";


export const userGoogleLogin = createAsyncThunk(
    "auth/userGoogleLogin",
    async (queryParams: any, { dispatch }) => {
        dispatch(startLoadingActivity())
        try {
            const { token, userId } = queryParams; // Assuming queryParams will contain token and userId
            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", userId);
            return { token, userId };

        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export interface GoogleSignIn {
    loading: boolean;
    data: any
}

const initialState: GoogleSignIn = {
    loading: false,
    data: {}
}

export const googleSlice = createSlice({
    name: "GoogleSignIn",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userGoogleLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userGoogleLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(userGoogleLogin.rejected, (state) => {
                state.loading = false;
            })
    }
})
export default googleSlice.reducer
