import { createSlice, PayloadAction, Slice, current } from "@reduxjs/toolkit";
import { findFile, findFilesByParentId, findFilesByParentPath } from "../../../functions";
import { IFile } from "../../../types/index.interfaces";
import type { RootState } from "../../index";

// Define a type for the slice state
export interface IHelperSidePanelState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: IHelperSidePanelState = {
  isOpen: false,
};

// actions
// const _addFileSystem = (state: IFileSystemState, action: PayloadAction<IFile>) => {
//   if (action.payload) state.filesystem = action.payload;
// };

// const _addFolder = (state: IFileSystemState, action: PayloadAction<[string, IFile]>) => {
//   if (!action.payload) return;
//   const parentId = action.payload[0];
//   const folder = action.payload[1];

//   let parentFolder = findFile(parentId, state.filesystem as IFile);
//   parentFolder?.children?.push(folder);

//   // side effect to save on to local storage
// };

const _openSidePanel = (state: IHelperSidePanelState) => {
  state.isOpen = !state.isOpen;
};

// selectors
export const selectOpenSidePanel = (state: RootState) => state.helperSidePanel.isOpen;

export const helperSidePanelSlicer: Slice<IHelperSidePanelState> = createSlice({
  name: "sidePanel",
  initialState,
  reducers: {
    openSidePanel: _openSidePanel,
  },
});

export const { openSidePanel } = helperSidePanelSlicer.actions;

export default helperSidePanelSlicer.reducer;
