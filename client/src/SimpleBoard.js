import React from "react";
import CanvasDraw from "react-canvas-draw";

function Board({ currentBrushColor, fileDataHook, canvasRef }) {
  const [boardSize, setBoardSize] = React.useState({
    width: 400,
    height: 400,
  });

  React.useEffect(() => {
    const handleResize = (e) => {
      setBoardSize({
        width: window.innerWidth - 0,
        height: window.innerHeight - 48 * 2 - 2,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CanvasDraw
      ref={canvasRef}
      lazyRadius={0}
      brushColor={currentBrushColor}
      hideGrid={true}
      gridColor={"rgba(150,150,150,0)"}
      canvasWidth={boardSize.width}
      canvasHeight={boardSize.height}
    />
  );
}

export default Board;
