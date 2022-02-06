import { createSlice, PayloadAction, Slice, current } from "@reduxjs/toolkit";
import { IManagerWindow, IReaderWindow, ITerminalWindow, IWindow } from "../../../components/Window/types";
import { EAppicationType, EWindowStatus } from "../../../types/index.enums";
import { IPosition, ISize } from "../../../types/index.interfaces";
import type { RootState } from "../../index";

// Define a type for the slice state
export interface IWindowManagerState {
  // windows: IWindow[];
  windows: Array<IWindow | ITerminalWindow>;
  topmost: number;
  desktop: number;
}

// Define the initial state using that type
const initialState: IWindowManagerState = {
  windows: [],
  topmost: 0,
  desktop: 0,
};

// actions
const _addWindow = (state: IWindowManagerState, action: PayloadAction<IWindow | ITerminalWindow | IReaderWindow | IManagerWindow>) => {
  action.payload && state.windows.push(action.payload);
};

const _removeWindow = (state: IWindowManagerState, action: PayloadAction<string>) => {
  state.windows = state.windows.filter((w) => w.id !== action.payload);
};

const _minimizeWindow = (state: IWindowManagerState, action: PayloadAction<string>) => {
  const currentWindow = state.windows.find((w) => w.id === action.payload);
  if (currentWindow) currentWindow.state = EWindowStatus.Minimized;
};

const _changeTopmost = (state: IWindowManagerState, action: PayloadAction<string>) => {
  const currentWindow = state.windows.find((w) => w.id === action.payload);
  if (currentWindow) {
    state.topmost += 1;
    currentWindow.zIndex = state.topmost;
  }
};

const _changeSize = (state: IWindowManagerState, action: PayloadAction<{ id: string; size: ISize }>) => {
  const currentWindow = state.windows.find((w) => w.id === action.payload.id);
  if (currentWindow) currentWindow.size = action.payload.size;
};

const _changePosition = (state: IWindowManagerState, action: PayloadAction<{ id: string; position: IPosition }>) => {
  const currentWindow = state.windows.find((w) => w.id === action.payload.id);
  if (currentWindow) currentWindow.position = action.payload.position;
};

// selectors
export const selectAllWindows = (state: RootState) => state.windowManager.windows;
export const selectTopmostValue = (state: RootState) => state.windowManager.topmost;
export const selectWindowById = (id: string) => (state: RootState) => state.windowManager.windows.find((w) => w.id === id);

export const windowsManagerSlicer: Slice<IWindowManagerState> = createSlice({
  name: "windowManager",
  initialState,
  reducers: {
    addWindow: _addWindow,
    removeWindow: _removeWindow,
    minimizeWindow: _minimizeWindow,
    changeTopmost: _changeTopmost,
    changeSize: _changeSize,
    changePosition: _changePosition,
  },
});

export const { addWindow, removeWindow, minimizeWindow, changeTopmost, changeSize, changePosition } = windowsManagerSlicer.actions;

export default windowsManagerSlicer.reducer;
