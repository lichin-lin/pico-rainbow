import React from "react";
import ThemeIcon from "./ThemeIcon";

function Header({ theme, handleSetTheme }) {
  return (
    <div className="h-12 px-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <div className="logo font-bold dark:text-white">
        <p>Pico Rainbow</p>
      </div>
      <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
      <div className="status flex font-normal dark:text-white">
        <p>Online</p>
        <div className="dot rounded w-2 h-2 bg-green-500"></div>
      </div>
    </div>
  );
}

export default Header;
