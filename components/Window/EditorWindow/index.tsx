import React from "react";

import Window from "../../../components/Window";
import { useAppSelector } from "../../../store/hooks";
import { selectTopmostValue } from "../../../store/reducers/windowManager";
import { IEditorWindowProps } from "../types";

const EditorWindow: React.FC<IEditorWindowProps> = (props) => {
  const { content } = props;

  const topmost = useAppSelector(selectTopmostValue);

  return (
    <Window content={content}>
      <div className="flex flex-1 bg-red-200">Editor</div>
    </Window>
  );
};

export default EditorWindow;
