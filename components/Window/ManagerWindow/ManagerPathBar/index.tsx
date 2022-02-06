import React from "react";
import { FaArrowUp, FaFileMedical, FaFolderPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectFileById } from "../../../../store/reducers/fileSystem";
import { IFile } from "../../../../types/index.interfaces";

interface ManagerPathBarProps {
  file: IFile | null;
  openFolder: Function;
}

const ManagerPathBar: React.FC<ManagerPathBarProps> = (props) => {
  const { file, openFolder } = props;

  const parentFolder = file && useAppSelector(selectFileById(file?.parent));

  const UpStyle = parentFolder ? "hover:text-gray-500 cursor-pointer" : "text-gray-600 cursor-auto";

  const handleGoUp = () => {
    if (!parent) return;

    openFolder(parentFolder);
  };

  return (
    <div className="flex flex-row flex-1 h-7 px-2 gap-3 items-center text-xs bg-gray-700 text-gray-300">
      <FaFolderPlus className="hover:text-gray-500 cursor-pointer" size={15} />
      <FaFileMedical className="hover:text-gray-500 cursor-pointer" size={13} />
      <span className="h-4 w-0.5 bg-gray-500" />
      <FaArrowUp className={UpStyle} size={13} onClick={handleGoUp} />
      <input type="text" className="flex flex-1 px-2 outline-none rounded-sm bg-gray-800" value={file?.path.replaceAll("/root", "") || "/"} disabled />
    </div>
  );
};

export default ManagerPathBar;
