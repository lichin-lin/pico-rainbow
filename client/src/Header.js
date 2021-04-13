import React from "react";
import ThemeIcon from "./ThemeIcon";
import useOnlineStatus from "@rehooks/online-status";

function Header({ theme, handleSetTheme }) {
  const onlineStatus = useOnlineStatus();

  const mappingStatus = (onlineStatus) => {
    switch (onlineStatus) {
      case true:
        return "bg-green-500";
      case false:
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="h-12 px-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <div className="logo font-bold dark:text-white">
        <p>Pico Rainbow</p>
      </div>
      <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
      <div className="status flex font-normal dark:text-white">
        <p>{onlineStatus ? "online" : "offline"}</p>
        <div
          className={`dot rounded w-2 h-2 ${mappingStatus(onlineStatus)}`}
        ></div>
      </div>
    </div>
  );
}

export default Header;
