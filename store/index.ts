import { configureStore } from "@reduxjs/toolkit";
import SampleReducer from "./reducers/counter";
import WindowManagerReducer from "./reducers/windowManager";
import FileSystemReducer from "./reducers/fileSystem";

export const store = configureStore({
  reducer: {
    windowManager: WindowManagerReducer,
    fileSystem: FileSystemReducer,
    counter: SampleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
