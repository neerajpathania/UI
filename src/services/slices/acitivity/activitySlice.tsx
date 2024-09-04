import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startLoadingActivity = createAsyncThunk(
    "activity/startLoadingActivity",
    async () => { }
);

export const stopLoadingActivity = createAsyncThunk(
    "activity/stopLoadingActivity",
    async () => { }
);

export const activitySlice = createSlice({
    name: "activity",
    initialState: {
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startLoadingActivity.pending, (state, _action) => {
                state.loading = true;
            })
            .addCase(startLoadingActivity.fulfilled, (state, _action) => {
                state.loading = true;
            })
            .addCase(startLoadingActivity.rejected, (state, _action) => {
                state.loading = false;
            })

            .addCase(stopLoadingActivity.pending, (state, _action) => {
                state.loading = true;
            })
            .addCase(stopLoadingActivity.fulfilled, (state, _action) => {
                state.loading = true;
            })
            .addCase(stopLoadingActivity.rejected, (state, _action) => {
                state.loading = false;
            })
    }
});


export default activitySlice.reducer;

