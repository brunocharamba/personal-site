import React, { useEffect, useState } from "react";

import Window from "..";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectFilesystem } from "../../../store/reducers/fileSystem";
import { addWindow, selectTopmostValue } from "../../../store/reducers/windowManager";
import { IFile } from "../../../types/index.interfaces";
import { IManagerWindowProps } from "../types";
import { FaFolderPlus, FaFolderMinus } from "react-icons/fa";

import { TreeItem, TreeView } from "@material-ui/lab";
import { findFile, getOnlyFolders, openFile } from "../../../functions";
import { withStyles } from "@material-ui/core";
import FileRow from "./FileRow";
import ManagerPathBar from "./ManagerPathBar";

const ManagerWindow: React.FC<IManagerWindowProps> = (props) => {
  const { content } = props;

  const [currenOpenFolder, setCurrentOpenFolder] = useState<IFile | null>(null);
  const topmost = useAppSelector(selectTopmostValue);
  const fileSystem = useAppSelector(selectFilesystem);
  const dispatch = useAppDispatch();

  const StyledTreeItem = withStyles({
    label: {
      backgroundColor: "transparent",
      fontSize: "12px",
    },
  })(TreeItem);

  const handleOpenFile = (file: IFile) => {
    if (file && file.type === "folder") {
      setCurrentOpenFolder(file);
      return;
    }

    dispatch(addWindow(openFile(file, topmost)));
  };

  const renderTree = (fs: IFile | null) => {
    if (fs == null) return;
    let mainNode = getOnlyFolders(fs);

    return mainNode?.map((c) => (
      <StyledTreeItem key={c.id} nodeId={c.id} label={c.name} onClick={() => setCurrentOpenFolder(findFile(c.id, fileSystem as IFile))}>
        {Array.isArray(c.children) ? c.children.map((node) => node.type === "folder" && renderChild(node)) : null}
      </StyledTreeItem>
    ));
  };

  const renderChild = (nodes: IFile) => {
    return (
      <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => setCurrentOpenFolder(findFile(nodes.id, fileSystem as IFile))}>
        {Array.isArray(nodes.children) && nodes.children.some((c) => c.type === "folder") ? nodes.children.map((node) => node.type === "folder" && renderChild(node)) : null}
      </StyledTreeItem>
    );
  };

  const renderContent = () => {
    if (!currenOpenFolder || !currenOpenFolder.children) return;
    return currenOpenFolder.children.map((c, i) => <FileRow key={c.id} file={c} openFile={handleOpenFile} />);
  };

  useEffect(() => {
    setCurrentOpenFolder(fileSystem);
  }, []);

  return (
    <Window content={content}>
      <div className="flex flex-1 flex-col bg-blue-200 h-auto select-none">
        <div className="flex">
          <ManagerPathBar file={currenOpenFolder} openFolder={handleOpenFile} />
        </div>
        <div className="flex flex-1 flex-row bg-gray-700 text-gray-300">
          <div className="flex w-40 overflow-auto p-2 border-r border-gray-600">
            <TreeView className="max-h-28" aria-label="rich object" defaultCollapseIcon={<FaFolderMinus size={14} />} defaultExpandIcon={<FaFolderPlus size={14} />}>
              {renderTree(fileSystem)}
            </TreeView>
          </div>
          <div className="flex flex-1 flex-col bg-gray-800 border-t border-gray-600 w-14">{renderContent()}</div>
        </div>
      </div>
    </Window>
  );
};

export default ManagerWindow;
