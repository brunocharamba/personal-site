import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { Grid, Position, ResizableDelta, ResizeEnable, Rnd } from "react-rnd";
import { DraggableEvent, DraggableData } from "react-draggable";
import { isMobile } from "react-device-detect";

import { IWindow, IWindowProps } from "./types";
import { IPosition, ISize } from "../../types/index.interfaces";
import TitleBar from "./TitleBar";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { changeTopmost, changePosition, changeSize } from "../../store/reducers/windowManager";
import { FaCircle } from "react-icons/fa";
import { EAppicationType } from "../../types/index.enums";

const defaultMinWidth: string | number = !isMobile ? 600 : "100%";
const defaultMinHeight: string | number = !isMobile ? 400 : "100%";

const defaultResizeGap: Grid = [10, 10];
const defaultEnableResizing: ResizeEnable = { bottomRight: true };

const Window: React.FC<IWindowProps> = (props) => {
  const { id, size, position, enableResizing, resizeGrid, titlebar, onDragStop, zIndex, type } = props.content as IWindow;

  const dispatch = useAppDispatch();

  const handleAppTitle = () => {
    switch (type) {
      case EAppicationType.Terminal:
        return "Terminal";
      case EAppicationType.Manager:
        return "Manager";
      case EAppicationType.Reader:
        return "Reader";
      case EAppicationType.Editor:
        return "Editor";
      default:
        return "Application";
    }
  };

  const handleDragStop = (e: DraggableEvent, d: DraggableData) => {
    const position: IPosition = { x: d.x, y: d.y };
    dispatch(changePosition({ id, position }));
  };

  const handleResizeStop = (e: MouseEvent | TouchEvent, dir: any, refElement: React.ElementRef<any>, delta: ResizableDelta, pos: Position) => {
    const ref = refElement as React.ElementRef<"div">;
    const size: ISize = { width: ref.offsetWidth, height: ref.offsetHeight };
    dispatch(changeSize({ id, size }));
  };

  const handleTopmost = () => {
    dispatch(changeTopmost(id));
  };

  return (
    <Rnd
      className="flex flex-col bg-gray-900 rounded-md shadow-window"
      dragHandleClassName="draggable"
      bounds="parent"
      size={size}
      position={position}
      minHeight={defaultMinHeight}
      minWidth={defaultMinWidth}
      enableResizing={enableResizing || defaultEnableResizing}
      resizeGrid={resizeGrid || defaultResizeGap}
      onDragStart={handleTopmost}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      style={{ zIndex }}
      resizeHandleClasses={{ bottomRight: "absolute flex justify-center items-center mr-2.5 mb-4 max-h-2" }}
      resizeHandleComponent={{
        bottomRight: <FaCircle size={8} className="text-white" />,
      }}
    >
      <div className="flex flex-1 flex-col h-full transition duration-150 ease-in-out">
        <TitleBar windowId={id} title={titlebar} appName={handleAppTitle()} />
        <div className="flex flex-1 w-full h-full" onClick={handleTopmost}>
          {props.children}
        </div>
        <div className="p-2.5 rounded-b-md bg-gray-700" />
      </div>
    </Rnd>
  );
};

export default Window;
