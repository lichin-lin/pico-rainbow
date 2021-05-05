import React from "react";
import { useState } from "react";
import ThemeIcon from "./ThemeIcon";

function Header({ theme, handleSetTheme, canvasRef, changeRoom, RoomID }) {
  const [newRoomID, setNewRoomID] = React.useState(RoomID);
  React.useEffect(() => {
    setNewRoomID(RoomID)
  }, [RoomID])
  return (
    <div className="h-12 px-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <div className="flex-1 logo font-bold dark:text-white flex">
        <p style={{ width: 'max-content' }}>Pico Rainbow</p>
        <div className="px-1">/</div>
        <input
          type="text"
          defaultValue={newRoomID}
          value={newRoomID}
          onChange={(e) => setNewRoomID(e.target.value)}
          placeholder="enter room name ✏️"
          className="w-32 px-1 rounded bg-transparent focus:outline-none focus:ring focus:border-blue-300 ..."
          onBlur={() => {
            changeRoom(newRoomID)
          }}
        />
        <div className="px-1"></div>
      </div>
      {/* Undo / Redo */}
      {/* Tools */}
      <div className="flex space-x-2">
        <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100">
          <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
        </div>
        {/* <div className="cursor-not-allowed transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black white">
          <GrRedo size={"1.4rem"} />
        </div> */}
      </div>
      {/* Theme */}
    </div>
  );
}

export default Header;
