import React from "react";
import useOnlineStatus from "@rehooks/online-status";

function Status() {
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
    <div className="status flex font-normal dark:text-white">
      <p>{onlineStatus ? "online" : "offline"}</p>
      <div
        className={`dot rounded w-2 h-2 ${mappingStatus(onlineStatus)}`}
      ></div>
    </div>
  );
}

export default Status;
