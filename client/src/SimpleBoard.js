import React from "react";
import CanvasDraw from "react-canvas-draw";

const PureCanvas = React.forwardRef((props, ref) => <canvas ref={ref} />);

function Board({ currentBrushColor }) {
  const canvasRef = React.useRef();
  const [boardSize, setBoardSize] = React.useState({
    width: 400,
    height: 400,
  })
  // React.useEffect(() => {
  //   const ctx = canvasRef.current.getContext("2d");
  //   const canvas = canvasRef.current;
  //   ctx.strokeStyle = "#BADA55";
  //   ctx.lineJoin = "round";
  //   ctx.lineCap = "round";
  //   ctx.lineWidth = 25;
  //   let isDrawing = false;
  //   let lastPoint = { x: 0, y: 0 };

  //   const handleMouseEvent = (e) => {
  //     if (isDrawing) {
  //       if (!lastPoint) {
  //         lastPoint = { x: e.offsetX, y: e.offsetY };
  //         return;
  //       }
  //       draw({
  //         lastPoint,
  //         x: e.offsetX,
  //         y: e.offsetY,
  //         color: currentBrushColor,
  //       });
  //       lastPoint = { x: e.offsetX, y: e.offsetY };
  //     }
  //   };

  //   const draw = (data) => {
  //     const { x, y, lastX, lastY, color } = data;
  //     ctx.beginPath();
  //     ctx.strokeStyle = color;
  //     ctx.moveTo(lastX, lastY);
  //     ctx.lineTo(x, y);
  //     ctx.stroke();
  //   };
  //   canvas.addEventListener("mousedown", (e) => {
  //     e.preventDefault();
  //     isDrawing = true;
  //     canvas.addEventListener("mousemove", handleMouseEvent);
  //   });
  //   canvas.addEventListener("mouseup", () => (isDrawing = false));
  //   canvas.addEventListener("mouseout", () => (isDrawing = false));
  // });
  React.useEffect(() => {
    const handleResize = (e) => {
      setBoardSize({
        width: window.innerWidth - 0,
        height: window.innerHeight - 48 * 2 - 2,
      })
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
  // <PureCanvas ref={canvasRef} />;
}

export default Board;
