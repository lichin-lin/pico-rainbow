import React from "react";
import { HexColorPicker } from "react-colorful";

function Footer({ currentBrushColor, setCurrentBrushColor }) {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleSetColor = (e) => {
    setCurrentBrushColor(e);
  };
  return (
    <div className="relative h-12 px-4 bg-white dark:bg-gray-900 shadow-sm flex justify-between items-center z-999">
      <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:bg-black bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      {/* download */}
      <div
        className="h-8 w-8 cursor-pointer transition rounded-md p-1 dark:text-gray-100 bg-gray-100"
        style={{ backgroundColor: currentBrushColor }}
        onClick={toggleColorPicker}
      ></div>
      {showColorPicker && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 mx-0">
          <HexColorPicker color={currentBrushColor} onChange={handleSetColor} />
        </div>
      )}
      <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:bg-black bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </div>
    </div>
  );
}

export default Footer;
