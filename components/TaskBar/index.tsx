import React from "react";

import { EAppicationType } from "../../types/index.enums";
import BarIcon from "./BarIcon";

const TaskBar: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-row justify-center h-6 bg-black bg-opacity-30 shadow-md mx-auto rounded-t-xl">
        <div className="flex flex-row items-end mb-2 mx-8">
          <BarIcon appType={EAppicationType.Terminal} />
          <BarIcon appType={EAppicationType.Manager} />
          <BarIcon appType={EAppicationType.Reader} />
          <BarIcon appType={EAppicationType.Editor} />
          <BarIcon appType={EAppicationType.TicTacToe} />
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
