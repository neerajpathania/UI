import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl";
import { startLoadingActivity, stopLoadingActivity } from "../acitivity/activitySlice";

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (data: FormData, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post(`/user/signin`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export interface SignIn {
    loading: boolean;
    data: []
}

const initialState: SignIn = {
    loading: false,
    data: [],
}

export const signInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
            })
    },
})

export default signInSlice.reducer