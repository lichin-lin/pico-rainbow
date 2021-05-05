import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Board from "./SimpleBoard";
import CustomCursor from "./components/CustomCursor";
import { throttle } from "./utils";
import { getFirebaseInstance } from "./firebase/index.js";
import { undo, redo } from "./utils/is-undo-redo-keyboard";

function App() {
  // global
  const [theme, setTheme] = React.useState("light");
  const [instance, setInstance] = React.useState(null);
  let location = useLocation();

  // cursor
  const [visible, setVisible] = React.useState(false);
  const [tempID] = React.useState(Math.random().toString(36).substring(7));
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [cursors, setCursors] = React.useState({});

  // settings
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttlePositionChange = React.useCallback(
    throttle(instance?.onCursorPositionChanged, 20),
    [instance]
  );

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
    const x = e.clientX;
    const y = e.clientY;
    handleMovingEvent(x, y)
  };
  const onTouchMove = (e) => {
    var touch = e?.touches[0] || e?.changedTouches[0];
    const x = touch.pageX;
    const y = touch.pageY;
    handleMovingEvent(x, y)
  };
  const handleMovingEvent = (x, y) => {
    if (y < 40) {
      setVisible(false);
      return;
    }
    if (!visible) {
      setVisible(true);
    }
    throttlePositionChange({ x, y });
    setPos({ x, y });
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, showColorPicker]);

  React.useEffect(() => {
    const handleCursor = (event, userId, posData) => {
      if (!userId) {
        return;
      }
      switch (event) {
        case "add":
        case "change":
          setCursors((prevCursors) => {
            const copiedCursors = { ...prevCursors };
            copiedCursors[userId] = { ...posData };
            return copiedCursors;
          });
          break;
        case "remove":
          setCursors((prevCursors) => {
            const copiedCursors = { ...prevCursors };
            const { [userId]: cursorToDelete, ...restCursors } = copiedCursors;
            return restCursors;
          });
          break;
        default:
          break;
      }
    };

    instance?.monitorCursors(handleCursor);
    return () => {
      instance?.disconnect();
    };
  }, [instance]);

  React.useEffect(() => {
    const _ = new URLSearchParams(location.search)
    setInstance(getFirebaseInstance && getFirebaseInstance(_.get('room') || 'test'));
  }, [location]);
  return (
    <div className="App h-screen flex flex-col">
      {/* Cursor */}
      {Object.values(cursors).map((cursor) => (
        <CustomCursor
          key={cursor.id}
          id={cursor.id}
          x={cursor.x}
          y={cursor.y}
        />
      ))}
      {visible && (
        <CustomCursor
          id={instance?.currentUserId || tempID}
          x={pos.x}
          y={pos.y}
        />
      )}
      {/* Header */}
      <Header
        canvasRef={canvasRef}
        theme={theme}
        handleSetTheme={handleSetTheme}
      />
      {/* Board Container */}
      <div
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseLeave={() => setVisible(false)}
        onMouseEnter={() => setVisible(true)}
        onTouchStart={() => setVisible(true)}
        onTouchEnd={() => setVisible(false)}
        style={{
          cursor: "none",
        }}
        className="relative flex-1 bg-blue-50 dark:bg-gray-800 shadow-sm flex items-center"
      >
        <Board
          canvasRef={canvasRef}
          currentBrushColor={currentBrushColor}
          fileDataHook={{ fileData, setFile }}
          inputRef={inputRef}
          FBInstance={instance}
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
