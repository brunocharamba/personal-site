import React from "react";

import { FaQuestion } from "react-icons/fa";
import { useAppDispatch } from "../../../store/hooks";
import { openSidePanel } from "../../../store/reducers/helperSidePanel";

const HelpBarButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleHelp = () => {
    dispatch(openSidePanel(null));
  };

  return (
    <div onClick={handleHelp}>
      <FaQuestion size={12} className="mr-6 cursor-pointer" />
    </div>
  );
};

export default HelpBarButton;
