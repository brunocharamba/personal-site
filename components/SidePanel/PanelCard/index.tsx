import React from "react";

interface IPanelCardProps {
  title: string;
}

const PanelCard: React.FC<IPanelCardProps> = (props) => {
  const { title, children } = props;

  return (
    <div className="mb-8">
      <div className="flex flex-1 flex-row items-center">
        <div className="mb-2 tracking-widest font-thin uppercase whitespace-nowrap">{title}</div>
        <hr className="bg-gray-200 border-dotted w-full ml-4 mr-1 mb-1.5" />
      </div>
      <div className="rounded-md px-4 py-2 bg-gray-900">{children}</div>
    </div>
  );
};

export default PanelCard;
