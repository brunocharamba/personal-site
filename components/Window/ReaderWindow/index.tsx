import React from "react";
import { v4 as uuid } from "uuid";

import Window from "../../../components/Window";
import { useAppSelector } from "../../../store/hooks";
import { selectTopmostValue } from "../../../store/reducers/windowManager";
import { IReaderWindowProps } from "../types";

const ReaderWindow: React.FC<IReaderWindowProps> = (props) => {
  const { content } = props;
  const topmost = useAppSelector(selectTopmostValue);

  return (
    <Window content={content}>
      <div className="flex flex-1 bg-green-200">
        <object data={content.file?.url} type="application/pdf" width="100%">
          <param name="view" value="Fit" />
          <p>
            Your web browser doesn&apos;t have a PDF plugin.
            <a href={content.file?.url}>click here to download the PDF file.</a>
          </p>
        </object>
      </div>
    </Window>
  );
};

export default ReaderWindow;
