import React, { useState } from "react";
import { IFile } from "../../../../types/index.interfaces";
import { FaFolder, FaFile } from "react-icons/fa";
import { getNameExtension } from "../../../../functions";
import ClickAwayListener from "@mui/base/ClickAwayListener";

interface IFileRowProps {
  file: IFile;
  openFile: Function;
}

const FileRow: React.FC<IFileRowProps> = (props) => {
  const { file, openFile } = props;

  const [clicked, setClicked] = useState<boolean>(false);

  //const styledRow = `flex items-center h-7 px-4 text-gray-300 text-xs ${isOdd ? "bg-gray-800" : "bg-gray-700"}`;
  const styledRow = `flex items-center justify-between h-7 px-4 text-gray-300 text-xs hover:bg-gray-700 h-full cursor-pointer select-none ${
    clicked ? "bg-gray-700" : "bg-gray-800"
  }`;

  const handleClick = (event: any) => {
    switch (event.detail) {
      case 1:
        setClicked(!clicked);
        break;
      case 2:
        setClicked(false);
        openFile(file);
        break;
      case 3:
        console.log("triple click");
        break;
      default:
        return;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setClicked(false)}>
      <div className={styledRow} onClick={handleClick}>
        <div className="flex items-center truncate">
          {file.type === "folder" ? <FaFolder className="text-yellow-200" /> : <FaFile />}
          <div className="ml-4 truncate">{file.name}</div>
        </div>
        <div className="w-20">{getNameExtension(file)}</div>
      </div>
    </ClickAwayListener>
  );
};

export default FileRow;
