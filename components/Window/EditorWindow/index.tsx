import React, { MouseEventHandler, useEffect, useRef } from "react";
import { VscItalic, VscBold, VscSave } from "react-icons/vsc";

import Window from "../../../components/Window";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectTopmostValue } from "../../../store/reducers/windowManager";
import { changeFileContent } from "../../../store/reducers/fileSystem";
import { IEditorWindowProps } from "../types";

import { ContentState, Editor, EditorState, RichUtils, convertFromHTML, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const EditorWindow: React.FC<IEditorWindowProps> = (props) => {
  const { content } = props;

  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
  const dispatch = useAppDispatch();

  const editor = useRef(null);
  const topmost = useAppSelector(selectTopmostValue);

  const focusEditor = () => editor?.current.focus();

  const onBoldClick = (e: MouseEvent) => {
    // e = e || window.event;
    // e.preventDefault();

    const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(nextState);
  };

  const onItalicClick = (e: MouseEvent) => {
    // e = e || window.event;
    // e.preventDefault();
    const nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(nextState);
  };

  const onSave = () => {
    var text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    dispatch(changeFileContent([text, content.file]));
  };

  useEffect(() => {
    //content.file && content.file?.data && setEditorState(EditorState.createWithContent(ContentState.createFromText(content.file.data)));
    content.file && content.file?.data && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content.file.data))));
  }, []);

  return (
    <Window content={content}>
      <div className="flex flex-1 flex-col bg-gray-100">
        <div className="flex flex-row w-full py-2 bg-gray-700">
          <div className="p-1 ml-2 rounded-md cursor-pointer shadow-lg bg-gray-400">
            <VscSave onMouseDown={onSave} />
          </div>
          <div className="p-1 ml-2 rounded-md cursor-pointer shadow-lg bg-gray-400">
            <VscBold onMouseDown={onBoldClick} />
          </div>
          <div className="p-1 ml-2 rounded-md cursor-pointer drop-shadow-2xl bg-gray-400">
            <VscItalic onMouseDown={onItalicClick} />
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto p-2" onClick={focusEditor}>
          <Editor ref={editor} editorState={editorState} onChange={setEditorState} />
        </div>
      </div>
    </Window>
  );
};

export default EditorWindow;
