import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Board from "./SimpleBoard";
import CustomCursor from "./components/CustomCursor";
import { undo, redo } from "./utils/is-undo-redo-keyboard";

function App() {
  const [theme, setTheme] = React.useState("light");
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [currentBrushColor, setCurrentBrushColor] = React.useState("#50514F");
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [fileData, setFile] = React.useState(0);
  const canvasRef = React.useRef();
  const inputRef = React.useRef();
  const handleSetTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "light") {
      localStorage.theme = "light";
      return;
    }
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
  const handleKeyboard = (event) => {
    if (event.key === "Escape") {
      setShowColorPicker(false);
    }
    if (event.key === "c") {
      setShowColorPicker(!showColorPicker);
    }
    if (event.key === "t") {
      handleSetTheme();
    }
    if (undo(event)) {
      handleUndoEvent();
    } else if (redo(event)) {
      handleRedoEvent();
    }
  };
  const onMouseMove = (e) => {
    if (!visible) {
      setVisible(true);
    }
    console.log(e.clientX, e.clientY);
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  };
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, showColorPicker]);
  return (
    <div
      className="App h-screen flex flex-col"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      style={{
        cursor: "none",
      }}
    >
      {/* Cursor */}
      {visible && <CustomCursor id={""} x={pos.x} y={pos.y} />}
      {/* Header */}
      <Header
        canvasRef={canvasRef}
        theme={theme}
        handleSetTheme={handleSetTheme}
      />
      {/* Board Container */}
      <div className="relative flex-1 bg-blue-50 dark:bg-gray-800 shadow-sm flex items-center">
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
