import React, { useState } from "react";

import Clock from "./ClockBarButton";
import Help from "./HelpBarButton";
import Search from "./SearchBarButton";
import Settings from "./SettingsBarButton";
import Sound from "./SoundBarButton";

const TopBar: React.FC = () => {
  return (
    <div className="flex flex-row h-6 px-3 justify-between text-sm font-bold text-gray-100 bg-black bg-opacity-30 shadow-md">
      <div className="flex flex-row items-center">
        {/* Maybe in the future... */}
        {/* <Search /> */}
      </div>
      <div className="flex flex-row items-center">
        <Clock />
      </div>
      <div className="flex flex-row items-center">
        {/* Maybe in the future... */}
        {/* <Sound /> */}
        <Help />
        {/* Maybe in the future... */}
        {/* <Settings /> */}
      </div>
    </div>
  );
};

export default TopBar;
