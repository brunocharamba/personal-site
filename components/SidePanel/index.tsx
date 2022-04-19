import React from "react";
import PanelCard from "./PanelCard";

// import { Container } from './styles';

const SidePanel: React.FC = () => {
  const renderUpcomingChangesContent = () => {
    return (
      <div className="text-sm">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc sapien, semper quis quam vel, bibendum molestie purus. Nam dictum eu metus id mollis. Donec varius
          aliquam orci, mattis sodales felis mattis at.
        </div>
        <div>
          Mauris tincidunt tristique metus non commodo. Donec dapibus turpis sit amet sagittis porttitor. Aenean ac dui quis tellus feugiat aliquet. Suspendisse erat urna, feugiat
          in quam a, dapibus elementum arcu. Aenean euismod lobortis ex, a rhoncus risus molestie eget. Morbi at tempus quam.
        </div>
      </div>
    );
  };

  const renderAboutMeContent = () => {
    return (
      <div className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc sapien, semper quis quam vel, bibendum molestie purus. Nam dictum eu metus id mollis. Donec varius
        aliquam orci, mattis sodales felis mattis at. Mauris tincidunt tristique metus non commodo. Donec dapibus turpis sit amet sagittis porttitor. Aenean ac dui quis tellus
        feugiat aliquet. Suspendisse erat urna, feugiat in quam a, dapibus elementum arcu. Aenean euismod lobortis ex, a rhoncus risus molestie eget. Morbi at tempus quam. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc sapien, semper quis quam vel, bibendum molestie purus. Nam dictum eu metus id mollis. Donec varius aliquam
      </div>
    );
  };

  return (
    // <div className="flex flex-1 flex-col items-end h-full animate-fade-in-right">
    <div className="flex flex-1 flex-col items-end h-full animate-fade-in-right">
      <div className="flex flex-1 flex-col w-1/3  bg-gray-800 text-gray-200 rounded-bl-lg opacity-90">
        <h1 className=" flex items-center justify-center p-2 font-thin tracking-widest bg-gray-900">HELP</h1>
        <div className="flex flex-1 flex-col p-8 overflow-y-auto">
          <PanelCard title="Upcoming Changes">{renderUpcomingChangesContent()}</PanelCard>
          <PanelCard title="About Me">{renderAboutMeContent()}</PanelCard>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
