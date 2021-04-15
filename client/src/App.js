import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Board from "./SimpleBoard";
import { undo, redo } from "./utils/is-undo-redo-keyboard";

function App() {
  const [theme, setTheme] = React.useState("light");
  const [currentBrushColor, setCurrentBrushColor] = React.useState("#50514F");
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [fileData, setFile] = React.useState(0);
  const canvasRef = React.useRef();
  const inputRef = React.useRef();
  const handleSetTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "light") {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
      return;
    }
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
  };
  const handleUndoEvent = () => {
    canvasRef?.current?.undo();
  };
  const handleRedoEvent = () => {
    // canvasRef?.current?.redo();
    // setFile('redo')
  };
  React.useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  React.useEffect(() => {
    setTheme(localStorage.theme);
  }, []);
  const handleStart = (evt) => {
    evt.preventDefault();
    const touches = evt.changedTouches;
    if (touches.length === 2) {
      handleUndoEvent();
    } else if (touches.length === 3) {
      // handleRedoEvent();
    }
  };
  const handleKeyboard = (event) => {
    if (event.key === "Escape") {
      // write your logic here.
      setShowColorPicker(false);
    }
    if (undo(event)) {
      handleUndoEvent();
    } else if (redo(event)) {
      handleRedoEvent();
    }
  };
  React.useEffect(() => {
    document.addEventListener("touchstart", handleStart, false);
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("touchstart", handleStart, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App h-screen flex flex-col">
      {/* Header */}
      <Header
        canvasRef={canvasRef}
        theme={theme}
        handleSetTheme={handleSetTheme}
      />
      {/* Board Container */}
      <div className="flex-1 bg-blue-50 dark:bg-gray-800 shadow-sm flex items-center">
        <Board
          canvasRef={canvasRef}
          currentBrushColor={currentBrushColor}
          fileDataHook={{ fileData, setFile }}
          inputRef={inputRef}
        />
      </div>
      {/* Board */}
      {/* Footer */}
      <Footer
        canvasRef={canvasRef}
        currentBrushColor={currentBrushColor}
        setCurrentBrushColor={setCurrentBrushColor}
        fileDataHook={{ fileData, setFile }}
        showColorPickerHook={{ showColorPicker, setShowColorPicker }}
        inputRef={inputRef}
      />
    </div>
  );
}

export default App;
