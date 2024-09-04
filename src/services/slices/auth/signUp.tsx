import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";
import {
    startLoadingActivity,
    stopLoadingActivity,
} from "../acitivity/activitySlice.tsx";

export const userSignUp = createAsyncThunk(
    "auth/userSignUp",
    async (data: FormData, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post(`/user/signup`, data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            console.error("API Error:", error);
            throw error; // Let the thunk handle errors
        } finally {
            dispatch(stopLoadingActivity());
        }
    }
);

export const emailVerification: any = createAsyncThunk(
    "auth/emailVerification",
    async (data) => {
        try {
            const response = await http.post(`/email_verification`, data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return error.response.data;
            }
        }
    }
);

export interface SignUp {
    loading: boolean;
    data: [];
}

const initialState: SignUp = {
    loading: false,
    data: [],
};

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // agent registration
            .addCase(userSignUp.pending, (state, _action) => {
                state.loading = true;
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(userSignUp.rejected, (state, _action) => {
                state.loading = false;
            });
    },
});

export default signUpSlice.reducer;
