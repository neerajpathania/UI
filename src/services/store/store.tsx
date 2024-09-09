import { configureStore } from "@reduxjs/toolkit";

// import signup from "../slices/auth/signup";
import signUpSlice from "../slices/auth/signUp";
import signInSlice from "../slices/auth/login";
import postSlice from "../slices/components/blogs";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        signIn: signInSlice,
        Post: postSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// function reportSlices(state: unknown, action: UnknownAction): unknown {
//   throw new Error("Function not implemented.");
// }