import React from "react";
import CanvasDraw from "./utils/react-canvas-draw";

function Board({
  currentBrushColor,
  fileDataHook,
  canvasRef,
  inputRef,
  FBInstance,
}) {
  const { fileData, setFile } = fileDataHook;
  const [documentData, setDocumentData] = React.useState("");
  const [boardRaio, setBoardRatio] = React.useState(1);
  const DEFAULT_BOARD_SIZE = 800;
  const [boardWrapperSize, setBoardWrapperSize] = React.useState({
    width: DEFAULT_BOARD_SIZE,
    height: DEFAULT_BOARD_SIZE,
  });
  React.useEffect(() => {
    // now always 400 x 400
    const handleResize = (e) => {
      const screenWidth = document.documentElement.clientWidth - 2;
      const screenHeight = document.documentElement.clientHeight - 48 * 2 - 2;

      const boardWidth = Math.min(DEFAULT_BOARD_SIZE, screenWidth);
      const boardHeight = Math.min(DEFAULT_BOARD_SIZE, screenHeight);
      const newBoardWrapperSize = Math.min(boardWidth, boardHeight) * 0.9;
      console.log(newBoardWrapperSize, DEFAULT_BOARD_SIZE);
      setBoardWrapperSize({
        width: newBoardWrapperSize,
        height: newBoardWrapperSize,
      });
      setBoardRatio(newBoardWrapperSize / DEFAULT_BOARD_SIZE);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  React.useEffect(() => {
    canvasRef?.current?.drawImage();
  }, [fileData]);
  React.useEffect(() => {
    const handleDoc = (event, posData) => {
      switch (event) {
        case "change":
          // console.log(posData || "{ lines: [] }");
          setDocumentData(posData || "{ lines: [] }");
          canvasRef?.current?.loadSaveData(posData, true);
          break;
        default:
          break;
      }
    };
    FBInstance?.monitorDocument(handleDoc);
    return () => {
      FBInstance?.disconnect();
    };
  }, [FBInstance]);

  return (
    <div
      className="border-gray-300 border dark:border-gray-600 flex items-center justify-center"
      style={{
        width: boardWrapperSize.width,
        height: boardWrapperSize.height,
      }}
    >
      {/* <CanvasDraw
        ref={canvasRef}
        lazyRadius={0}
        brushColor={currentBrushColor}
        hideGrid={true}
        brushRadius={4}
        gridColor={"rgba(150,150,150,0)"}
        canvasWidth={boardWrapperSize.width}
        canvasHeight={boardWrapperSize.height}
        backgroundColor={"transparent"}
        imgSrc={fileData}
        FBInstance={FBInstance}
        // onChange={() => {
        //   // const data = canvasRef?.current?.getSaveData()
        // }}
      /> */}
    </div>
  );
}

export default Board;
