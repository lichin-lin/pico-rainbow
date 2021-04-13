import React from "react";
import ThemeIcon from "./ThemeIcon";

function Header({ theme, handleSetTheme }) {
  const [network, setNetwork] = React.useState("offline");

  const mappingStatus = () => {
    switch (network) {
      case "online":
        return "green";
      case "offline":
        return "red";
      default:
        return "yellow";
    }
  };
  React.useEffect(() => {
    window.addEventListener("load", () => {
      function handleNetworkChange(event) {
        if (navigator.onLine) {
          document.body.classList.remove("offline");
          setNetwork("online");
        } else {
          document.body.classList.add("offline");
          setNetwork("offline");
        }
      }
      window.addEventListener("online", handleNetworkChange);
      window.addEventListener("offline", handleNetworkChange);
      handleNetworkChange()
    });
  }, []);

  return (
    <div className="h-12 px-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
      <div className="logo font-bold dark:text-white">
        <p>Pico Rainbow</p>
      </div>
      <ThemeIcon theme={theme} handleSetTheme={handleSetTheme} />
      <div className="status flex font-normal dark:text-white">
        <p>{network}</p>
        <div className={`dot rounded w-2 h-2 bg-${mappingStatus()}-500`}></div>
      </div>
    </div>
  );
}

export default Header;
