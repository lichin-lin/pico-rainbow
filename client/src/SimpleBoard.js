import React from "react";
import CanvasDraw from "./utils/react-canvas-draw";

function Board({ currentBrushColor, fileDataHook, canvasRef,
  inputRef, FBInstance }) {
  const { fileData, setFile } = fileDataHook;
  const [documentData, setDocumentData] = React.useState('');
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
  React.useEffect(()=> {
    canvasRef?.current?.drawImage();
  }, [fileData])
  React.useEffect(()=> {
    const handleDoc = (event, posData) => {
      switch (event) {
        case 'change':
          console.log(posData || '');
          setDocumentData(posData || '');
          canvasRef?.current?.loadSaveData(posData, true);
          break;
        default:
          break;
      }
    }
    FBInstance?.monitorDocument(handleDoc);
    return () => {
      FBInstance?.disconnect();
    };
  }, [FBInstance])
  return (
    <CanvasDraw
      ref={canvasRef}
      lazyRadius={0}
      brushColor={currentBrushColor}
      hideGrid={true}
      brushRadius={8}
      gridColor={"rgba(150,150,150,0)"}
      canvasWidth={boardSize.width}
      canvasHeight={boardSize.height}
      backgroundColor={'transparent'}
      imgSrc={fileData}
      FBInstance={FBInstance}
      // onChange={() => {
      //   // const data = canvasRef?.current?.getSaveData()
      // }}
    />
  );
}

export default Board;
