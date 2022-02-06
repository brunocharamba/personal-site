export interface IPosition {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IFile {
  id: string;
  name: string;
  path: string;
  fullpath: string;
  url?: string;
  type: string;
  extension: string;
  isFolder: boolean;
  data: string | null;
  executable: boolean;
  position: number;
  children: IFile[] | null;
  parent: string | null;
}
