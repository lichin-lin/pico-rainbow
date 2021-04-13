import React from "react";
import Header from './Header';
import Footer from './Footer';
import Board from './SimpleBoard';

function App() {
  const [theme, setTheme] = React.useState("light");
  const [currentBrushColor, setCurrentBrushColor] = React.useState('#50514F');
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
  return (
    <div className="App h-screen flex flex-col">
      {/* Header */}
      <Header theme={theme} handleSetTheme={handleSetTheme} />
      {/* Board Container */}
      <div className="flex-1 bg-blue-50 dark:bg-gray-800 shadow-sm flex items-center">
        <Board currentBrushColor={currentBrushColor}/>
      </div>
      {/* Board */}
      {/* Footer */}
      <Footer currentBrushColor={currentBrushColor} setCurrentBrushColor={setCurrentBrushColor}/>
    </div>
  );
}

export default App;
