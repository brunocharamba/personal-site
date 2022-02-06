import React, { useState } from "react";

import Clock from "./Clock";
import Help from "./Help";
import Search from "./Search";
import Settings from "./Settings";
import Sound from "./Sound";

const TopBar: React.FC = () => {
  return (
    <div className="flex flex-row h-6 px-3 justify-between text-sm font-bold text-gray-100 bg-black bg-opacity-30 shadow-md">
      <div className="flex flex-row items-center">
        <Search />
      </div>
      <div className="flex flex-row items-center">
        <Clock />
      </div>
      <div className="flex flex-row items-center">
        <Sound />
        <Help />
        <Settings />
      </div>
    </div>
  );
};

export default TopBar;
