import { configureStore } from "@reduxjs/toolkit";
import SampleReducer from "./reducers/counter";
import WindowManagerReducer from "./reducers/windowManager";
import FileSystemReducer from "./reducers/fileSystem";
import HelperSidePanelReducer from "./reducers/helperSidePanel";

export const store = configureStore({
  reducer: {
    windowManager: WindowManagerReducer,
    fileSystem: FileSystemReducer,
    helperSidePanel: HelperSidePanelReducer,
    counter: SampleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
