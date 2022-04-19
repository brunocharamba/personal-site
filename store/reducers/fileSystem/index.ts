import { createSlice, PayloadAction, Slice, current } from "@reduxjs/toolkit";
import { findFile, findFilesByParentId, findFilesByParentPath } from "../../../functions";
import { IFile } from "../../../types/index.interfaces";
import type { RootState } from "../../index";

// Define a type for the slice state
export interface IFileSystemState {
  filesystem: IFile | null;
}

// Define the initial state using that type
const initialState: IFileSystemState = {
  filesystem: null,
};

// actions
const _addFileSystem = (state: IFileSystemState, action: PayloadAction<IFile>) => {
  if (action.payload) state.filesystem = action.payload;
};

const _addFolder = (state: IFileSystemState, action: PayloadAction<[string, IFile]>) => {
  if (!action.payload) return;
  const parentId = action.payload[0];
  const folder = action.payload[1];

  let parentFolder = findFile(parentId, state.filesystem as IFile);
  parentFolder?.children?.push(folder);

  // side effect to save on to local storage
};

const _changeFileContent = (state: IFileSystemState, action: PayloadAction<[string, IFile]>) => {
  if (!action.payload) return;

  const content = action.payload[0];
  const file = action.payload[1];

  let currentFile = findFile(file.id, state.filesystem as IFile);

  if (!currentFile) return;

  currentFile.data = content;

  // let local = localStorage.getItem("fs");
  // if (!local) {
  //   const stringFs = JSON.stringify(fs);
  //   localStorage.setItem("fs", stringFs);
  //   local = stringFs;
  // }
  // const localFilesystem: IFile = JSON.parse(local);
  // dispatch(addFileSystem(localFilesystem));

  localStorage.setItem("fs", JSON.stringify(state.filesystem));

  console.log("fs", current(currentFile), current(state.filesystem));
};

// selectors
export const selectFilesystem = (state: RootState) => state.fileSystem.filesystem;
export const selectFileById = (id: string | null) => (state: RootState) => state.fileSystem.filesystem && findFile(id, state.fileSystem.filesystem);
export const selectFilesByParentId = (id: string) => (state: RootState) => state.fileSystem.filesystem && findFilesByParentId(id, state.fileSystem.filesystem);
export const selectFilesbByParentPath = (path: string) => (state: RootState) => state.fileSystem.filesystem && findFilesByParentPath(path, state.fileSystem.filesystem);

export const fileSystemSlicer: Slice<IFileSystemState> = createSlice({
  name: "filesystem",
  initialState,
  reducers: {
    addFileSystem: _addFileSystem,
    addFolder: _addFolder,
    changeFileContent: _changeFileContent,
  },
});

export const { addFileSystem, addFolder, changeFileContent } = fileSystemSlicer.actions;

export default fileSystemSlicer.reducer;
