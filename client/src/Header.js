import React from "react";
import ThemeIcon from "./ThemeIcon";
import { GrUndo, GrRedo, GrTrash } from "react-icons/gr";

function Header({ theme, handleSetTheme, canvasRef }) {
  const handleUndo = () => {
    canvasRef?.current?.undo();
  };
  return (
    <div className="h-12 px-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <div className="w-8 logo font-bold dark:text-white">
        <p style={{ width: 'max-content' }}>Pico Rainbow</p>
      </div>
      {/* Undo / Redo */}
      {/* Tools */}
      <div className="flex space-x-2">
        <div
          className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100"
          onClick={handleUndo}
        >
          <GrUndo size={"1.4rem"} />
        </div>
        <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100">
          <GrRedo size={"1.4rem"} />
        </div>
      </div>
      {/* Theme */}
      <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
    </div>
  );
}

export default Header;
