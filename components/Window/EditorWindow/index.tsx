import React, { useEffect, useRef } from "react";

import Window from "../../../components/Window";
import { useAppSelector } from "../../../store/hooks";
import { selectTopmostValue } from "../../../store/reducers/windowManager";
import { IEditorWindowProps } from "../types";

import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const EditorWindow: React.FC<IEditorWindowProps> = (props) => {
  const { content } = props;

  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
  const editor = useRef(null);
  const topmost = useAppSelector(selectTopmostValue);

  const focusEditor = () => editor?.current.focus();

  useEffect(() => {
    content.file && content.file?.data && setEditorState(EditorState.createWithContent(ContentState.createFromText(content.file.data)));
  }, []);

  console.log("content", content);

  return (
    <Window content={content}>
      <div className="flex flex-1 flex-col bg-gray-100">
        <div className="w-full bg-gray-600">BAR</div>
        <div className="h-full w-full overflow-y-auto p-2" onClick={focusEditor}>
          <Editor ref={editor} editorState={editorState} onChange={setEditorState} />
        </div>
      </div>
    </Window>
  );
};

export default EditorWindow;
