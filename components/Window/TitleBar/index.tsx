import React from "react";

import { FaTimes, FaMinus, FaExpandAlt } from "react-icons/fa";
import { ITilteBar } from "./types";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { removeWindow, minimizeWindow } from "../../../store/reducers/windowManager";
import { isDesktop, isMobile } from "react-device-detect";

const defaultTitle = "New window";

const TitleBar: React.FC<ITilteBar> = (props) => {
  const { windowId, title } = props;

  const dispatch = useAppDispatch();

  const closeClick = () => {
    dispatch(removeWindow(windowId));
  };

  const minimizeClick = () => {
    dispatch(minimizeWindow(windowId));
  };

  const maximizeClick = () => {};

  /**
   * Fucntion that enable the rendering of Maximize and Minimize buttons when the viewport isn't MOBILE.
   * For Mobile, only the close button is available
   * @returns Maximize and minimize buttons
   */
  const renderMinimizeMaximizeButtons = () => {
    return (
      isDesktop && (
        <>
          <div className="m-1 p-0.5 rounded-lg cursor-pointer bg-yellow-400 hover:bg-opacity-60 active:bg-opacity-30" onClick={minimizeClick} aria-hidden="true">
            <FaMinus size={8} />
          </div>
          <div className="m-1 p-0.5 rounded-lg cursor-pointer bg-green-400 hover:bg-opacity-60 active:bg-opacity-30" onClick={maximizeClick} aria-hidden="true">
            <FaExpandAlt size={8} />
          </div>
        </>
      )
    );
  };

  return (
    <div aria-hidden="true" className="flex flex-row p-0.5 h-auto bg-gray-700 rounded-t-md shadow-xl cursor-default draggable">
      <div className="m-1 p-0.5 rounded-lg bg-red-400 hover:bg-opacity-60 active:bg-opacity-30" onClick={closeClick} onTouchEnd={closeClick} aria-hidden="true">
        <FaTimes size={8} />
      </div>
      {renderMinimizeMaximizeButtons()}
      <div className="flex flex-1 text-xs justify-center text-white select-none">
        {title || defaultTitle} - {props.appName}
      </div>
    </div>
  );
};

export default TitleBar;
