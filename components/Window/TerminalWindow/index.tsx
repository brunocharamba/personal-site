import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import Window from "../../../components/Window";
import { commandSwitch } from "../../../functions/bash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeTopmost, selectTopmostValue } from "../../../store/reducers/windowManager";
import { ITerminalWindowProps } from "../types";

const TerminalWindow: React.FC<ITerminalWindowProps> = (props) => {
  const { content } = props;
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);

  const topmost = useAppSelector(selectTopmostValue);

  const makeHistory = () =>
    history.map((h, i) => (
      <p className="break-all" key={i}>
        {h}
      </p>
    ));

  const handleWindowClick = () => {
    dispatch(changeTopmost(content.id));
    inputRef?.current?.focus();
  };

  // const handleSize = () => content.size?.height + 25;
  const handleSize = () => content.size?.height - 25;

  const handleCommand = () => {
    const response = commandSwitch(inputText);
    setHistory([...history, ...[inputText, response]]);

    setInputText("");
  };

  useEffect(() => {
    inputRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [history, content.position]);

  return (
    <Window content={content}>
      {/* <div className="flex flex-1 bg-gray-200">Terminal</div> */}
      <div className="flex flex-col flex-grow items-stretch p-2 px-3 text-gray-200 text-xs" onClick={() => handleWindowClick()}>
        <div
          className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thumb-gray-800 scrollbar-track-gray-700"
          style={{ maxHeight: handleSize() }}
        >
          {/* <div className="flex flex-col overflow-y-auto"> */}
          {makeHistory()}
          <div className="flex flex-1 flex-row justify-center items-center mt-1 mr-4 bg-gray-800">
            <FaChevronRight className="text-green-400" size={12} />
            <input
              ref={inputRef}
              type="text"
              className="flex flex-1 ml-1 mr-2 bg-gray-800 text-green-300 focus:outline-none"
              value={inputText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleCommand()}
            />
          </div>
          {/* <div ref={ref} /> */}
        </div>
        {/* input */}
      </div>
    </Window>
  );
};

export default TerminalWindow;
