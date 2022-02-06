import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaTerminal, FaEdit, FaRegWindowRestore, FaBookReader } from "react-icons/fa";
import { GiTicTacToe } from "react-icons/gi";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addWindow, selectTopmostValue } from "../../../store/reducers/windowManager";
import { EAppicationType, EWindowStatus } from "../../../types/index.enums";
import { IManagerWindow, IEditorWindow, IReaderWindow, ITerminalWindow, IWindow } from "../../Window/types";
import { IBarIconProps } from "./types";
import { openFile } from "../../../functions";
import { ISize } from "../../../types/index.interfaces";

const defaultSize: ISize = { width: 600, height: 300 };

const BarIcon: React.FC<IBarIconProps> = (props) => {
  const { appType } = props;

  const topmost = useAppSelector(selectTopmostValue);
  const dispatch = useAppDispatch();

  const renderIcon = () => {
    const getItem = () => {
      switch (appType) {
        case EAppicationType.Terminal:
          backgroundColor = "bg-gray-800";
          return <FaTerminal className="h-5 w-5" />;
        case EAppicationType.Manager:
          backgroundColor = "bg-blue-800";
          return <FaRegWindowRestore className="h-5 w-5" />;
        case EAppicationType.Reader:
          backgroundColor = "bg-red-800";
          return <FaBookReader className="h-5 w-5" />;
        case EAppicationType.Editor:
          backgroundColor = "bg-purple-800";
          return <FaEdit className="h-5 w-5" />;
        case EAppicationType.TicTacToe:
          backgroundColor = "bg-yellow-800";
          return <GiTicTacToe className="h-6 w-6" />;
        default:
          break;
      }
    };

    let backgroundColor = "bg-black";
    const icon = getItem();
    const style = `flex flex-1 justify-center items-center w-10 h-10 mx-2 rounded-full text-gray-200 shadow-md ${backgroundColor}`;

    return (
      <div className={style} onClick={handleAddWindow}>
        {/* <div className="relative top-0 right-0 mb-1 flex items-center justify-center text-xs text-gray-300 rounded-full bg-red-500 shadow-md w-4 h-4 border border-gray-300">
          2
        </div> */}
        {icon}
      </div>
    );
  };

  const handleAddWindow = () => {
    console.log(defaultSize);
    switch (appType) {
      case EAppicationType.Terminal:
        const terminalWindow: ITerminalWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize };
        dispatch(addWindow(terminalWindow));
        break;
      case EAppicationType.Reader:
        const readerWindow: IReaderWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize };
        dispatch(addWindow(readerWindow));
        break;
      case EAppicationType.Editor:
        const editorWindow: IEditorWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize };
        dispatch(addWindow(editorWindow));
        break;
      case EAppicationType.Manager:
        const managerWindow: IManagerWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize };
        dispatch(addWindow(managerWindow));
        break;
      case EAppicationType.TicTacToe:
        const tictactoeWindow: IWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: { height: 600, width: 600 } };
        dispatch(addWindow(tictactoeWindow));
        break;
      default:
        const window: IWindow = { id: uuid(), state: EWindowStatus.Window, type: appType, zIndex: topmost, size: defaultSize };
        dispatch(addWindow(window));
        break;
    }
  };

  return <>{renderIcon()}</>;
};

export default BarIcon;
