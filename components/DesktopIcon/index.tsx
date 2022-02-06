import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { FaFilePdf, FaFileAlt, FaFile } from "react-icons/fa";
import { SiPurescript } from "react-icons/si";
import { Rnd } from "react-rnd";
import { getDefaultAppByFile, openFile } from "../../functions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addWindow, selectTopmostValue } from "../../store/reducers/windowManager";
import { IFile, IPosition } from "../../types/index.interfaces";
import { DraggableEvent, DraggableData } from "react-draggable";
import { EAppicationType } from "../../types/index.enums";

interface IDesktopIconProps {
  file: IFile;
  position?: IPosition;
}

const wrapperStyle = `flex flex-col items-center w-24 p-3 cursor-default select-none
  hover:ring-1 hover:ring-gray-300 hover:ring-inset hover:bg-gray-300 hover:opacity-80 hover:rounded
  active:bg-gray-500`;

const DesktopIcon: React.FC<IDesktopIconProps> = (props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [iconPosition, setIconPosition] = useState<IPosition | null>();

  const { file, position } = props;

  const dispatch = useAppDispatch();
  const topmost: number = useAppSelector(selectTopmostValue);

  const handleClick = (event: any) => {
    switch (event.detail) {
      case 1:
        setSelected(true);
        break;
      case 2:
        handleDoubleClick();
        setSelected(false);
        break;
      case 3:
        console.log("triple click");
        break;
      default:
        return;
    }
  };

  const handleDoubleClick = () => {
    dispatch(addWindow(openFile(file, topmost)));
  };

  const handleDragStop = (e: DraggableEvent, d: DraggableData) => {
    const newPosition: IPosition = { x: d.x, y: d.y };
    setIconPosition(newPosition);
  };

  const renderDesktopIcon = (): JSX.Element => {
    const appType = getDefaultAppByFile(file.extension);

    switch (appType) {
      case EAppicationType.Terminal:
        return <SiPurescript size={45} className="text-gray-800" />;
      case EAppicationType.Reader:
        return <FaFilePdf size={45} className="text-red-500" />;
      case EAppicationType.Editor:
        return <FaFileAlt size={45} className="text-gray-400" />;
      default:
        return <FaFile size={45} className="text-gray-200" />;
    }
  };

  return (
    <Rnd bounds="parent" enableResizing={false} position={iconPosition || position} onDragStop={handleDragStop}>
      <ClickAwayListener onClickAway={() => setSelected(false)}>
        <div className={selected ? `${wrapperStyle} bg-gray-500` : wrapperStyle} onClick={handleClick}>
          <div className="absolute rounded bg-gray-600 leading-4 px-1 -mr-16 -mt-2">
            <span className="text-white text-xs mb-1">{file.extension && file.extension.toUpperCase()}</span>
          </div>
          {/* <FaFilePdf size={45} className="text-red-500" /> */}
          {renderDesktopIcon()}
          <p
            className="overflow-ellipsis overflow-hidden text-sm text-gray-100 text-center leading-4 px-1 mt-2 max-h-16 w-24 "
            style={{
              textShadow: "0px 1px 4px rgb(30 29 39 / 90%), 1px 2px 2px rgb(54 64 147 / 90%)",
            }}
          >
            {file.name}
          </p>
        </div>
      </ClickAwayListener>
    </Rnd>
  );
};

export default DesktopIcon;
