import { v4 as uuid } from "uuid";
import EditorWindow from "../components/Window/EditorWindow";
import { IManagerWindow, IEditorWindow, IReaderWindow, ITerminalWindow, IWindow, ITicTacToeWindow } from "../components/Window/types";

import { EAppicationType, EWindowStatus } from "../types/index.enums";
import { IFile, IPosition, ISize } from "../types/index.interfaces";

let defaultApps = new Map<string, EAppicationType>([
  ["", EAppicationType.Manager],
  ["pdf", EAppicationType.Reader],
  ["txt", EAppicationType.Editor],
  ["sh", EAppicationType.Terminal],
  ["app", EAppicationType.TicTacToe],
]);

const defaultSize: ISize = { width: 500, height: 300 };

// FILE

export const openFile = (file: IFile, topmost: number) => {
  if (!file) return;

  const appType = getDefaultAppByFile(file.extension);

  switch (appType) {
    case EAppicationType.Terminal:
      return { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize } as ITerminalWindow;
    case EAppicationType.Reader:
      return { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize, file } as IReaderWindow;
    case EAppicationType.Editor:
      return { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize, file } as IEditorWindow;
    case EAppicationType.Manager:
      return { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize } as IManagerWindow;
    case EAppicationType.TicTacToe:
      return { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize } as ITicTacToeWindow;
    default:
      return { id: uuid(), state: EWindowStatus.Window, zIndex: topmost, size: defaultSize } as IWindow;
  }
};

export const getNameExtension = (file: IFile): string => {
  if (!file) return "";

  const appType = getDefaultAppByFile(file.extension);

  switch (appType) {
    case EAppicationType.Terminal:
      return "Script file";
    case EAppicationType.Reader:
      return "PDF file";
    case EAppicationType.Editor:
      return "Editable file";
    case undefined:
      return "Folder";
    default:
      return "";
  }
};

export const getDefaultAppByFile = (extension: string): EAppicationType | undefined => {
  return defaultApps.get(extension);
};

// DESKTOP ICON

export const calculateDesktopIconPosition = (pos: IPosition, index: number): IPosition => {
  if (index == 0) return { x: 0, y: 0 } as IPosition;
  return { x: 0, y: pos.y + 120 } as IPosition;
};

// FILESYSTEM

export const findFile = (id: string, node: IFile): IFile | null => {
  if (node.id === id) return node;
  if (!node || !node.children) return null;

  for (const child of node.children) {
    const found = findFile(id, child);
    if (found) return found;
  }

  return null;
};

export const findFilesByParentId = (parentId: string, node: IFile): IFile[] | null | undefined => {
  const parent = findFile(parentId, node);
  return parent?.children;
};

export const findFilesByParentPath = (path: string, node: IFile): IFile[] | null => {
  if (node.path === path) return node.children;
  if (!node || !node.children) return null;

  for (const child of node.children) {
    const found = findFilesByParentPath(path, child);
    if (found) return found;
  }

  return null;
};

export const getOnlyFolders = (node: IFile): IFile[] => {
  if (!node.children) return [];

  return node.children.reduce(function (r, a) {
    var temp: IFile[] = getOnlyFolders(a);
    // return r.concat(a.type === "folder" ? Object.assign({}, a, { children: temp }) : []);
    return (r as any).concat(a.type === "folder" ? Object.assign({}, a, { children: temp }) : []);
  }, []);
};
