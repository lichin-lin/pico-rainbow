import React from "react";
import { HexColorPicker } from "react-colorful";
import Status from "./components/Status";
import { FiTrash2 } from "react-icons/fi";

function Footer({ currentBrushColor, setCurrentBrushColor }) {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleSetColor = (e) => {
    setCurrentBrushColor(e);
  };
  return (
      <div className="relative h-16 px-4 bg-white dark:bg-gray-900 shadow-sm flex justify-between items-center z-999">
        {/* Tools */}
        <div className="flex space-x-2">
          <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100">
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
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          {/* <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100">
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
        </div> */}
          <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100">
            <FiTrash2 size={"1.4rem"} />
          </div>
        </div>

        {/* Color Picker */}
        <div
          className="h-8 w-8 cursor-pointer transition rounded-md p-1 dark:text-gray-100 bg-gray-100"
          style={{ backgroundColor: currentBrushColor }}
          onClick={toggleColorPicker}
        ></div>
        {showColorPicker && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 transform mx-0">
            <HexColorPicker
              color={currentBrushColor}
              onChange={handleSetColor}
            />
          </div>
        )}

        <Status />
        {/* Download */}
        {/* <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:bg-black bg-gray-100">
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
      </div> */}
      </div>
  );
}

export default Footer;
