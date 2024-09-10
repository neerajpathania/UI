import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl";
import { startLoadingActivity, stopLoadingActivity } from "../acitivity/activitySlice";
import { useParams } from "react-router-dom";

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
            const token = response.data.token;
            const userId = response.data._id
            localStorage.setItem("authToken", token)
            localStorage.setItem("userId", userId)
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

export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (data: FormData, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post(`/user/forgetPassword`, data, {
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

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data: any, { dispatch }) => {

        dispatch(startLoadingActivity());
        try {
            const response = await http.post(`/user/resetPassword?token=${data.token}`, { newPassword: data.newPassword }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw Error;
            }
        } catch (error) {
            console.log("API Error", error);
            throw error;
        } finally {
            dispatch(stopLoadingActivity())
        }
    }
)

export const profileData = createAsyncThunk(
    "auth/profileData",
    async (data: any, { dispatch }) => {
        dispatch(startLoadingActivity());
        try {
            const response = await http.post(`/user/getProfileData`, data, {
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
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(forgetPassword.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.loading = false;
            })
            .addCase(profileData.pending, (state) => {
                state.loading = true;
            })
            .addCase(profileData.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.loading = false;
            })
            .addCase(profileData.rejected, (state) => {
                state.loading = false;
            })
    },
})

export default signInSlice.reducer