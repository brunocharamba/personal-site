import { Grid, ResizeEnable } from "react-rnd";
import { DraggableEventHandler, DraggableEvent, DraggableData } from "react-draggable";
import { IFile, IPosition, ISize } from "../../types/index.interfaces";
import { EAppicationType, EWindowStatus } from "../../types/index.enums";

export interface IWindow {
  id: string;
  zIndex: number;
  state: EWindowStatus;
  type: EAppicationType;
  titlebar?: string;
  size?: ISize;
  position?: IPosition;
  onDragStop?: Function;
  resizeGrid?: Grid;
  enableResizing?: ResizeEnable;
}

export interface IWindowProps {
  content: IWindow;
}

export interface ITerminalWindow extends IWindow {
  extra?: any;
}

export interface ITerminalWindowProps {
  content: ITerminalWindow;
}

export interface IReaderWindow extends IWindow {
  file?: IFile;
}

export interface IReaderWindowProps {
  content: IReaderWindow;
}

export interface IManagerWindow extends IWindow {
  extra?: any;
}

export interface IManagerWindowProps {
  content: IManagerWindow;
}

export interface IEditorWindow extends IWindow {
  extra?: any;
}

export interface IEditorWindowProps {
  content: IEditorWindow;
}

export interface ITicTacToeWindow extends IWindow {
  extra?: any;
}
