import { configureStore } from "@reduxjs/toolkit";

// import signup from "../slices/auth/signup";
import signUpSlice from "../slices/auth/signup";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// function reportSlices(state: unknown, action: UnknownAction): unknown {
//   throw new Error("Function not implemented.");
// }