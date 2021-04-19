"use strict";
import React from "react";
import { HexColorPicker } from "react-colorful";
import Status from "./components/Status";
import { FiTrash2 } from "react-icons/fi";
import UploadImage from "./components/UploadImage";
function Footer({
  currentBrushColor,
  setCurrentBrushColor,
  fileDataHook,
  canvasRef,
  showColorPickerHook,
  inputRef,
}) {
  const { showColorPicker, setShowColorPicker } = showColorPickerHook;
  const { fileData, setFile } = fileDataHook;
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleSetColor = (e) => {
    setCurrentBrushColor(e);
  };
  const handleClear = () => {
    canvasRef?.current?.clear();
    canvasRef?.current?.removeImage();
  };
  const handleUpload = () => {
    inputRef?.current?.click();
  };
  const handleDownload = () => {
    const { blob, dataUri } = combineDrawing(canvasRef);
    saveImage(blob, `canvas-${new Date() / 1}.png`);
  };
  const combineDrawing = (canvasRef) => {
    const width = canvasRef.current.props.canvasWidth;
    const height = canvasRef.current.props.canvasHeight;
    const background = canvasRef.current.canvasContainer.children[3];
    const drawing = canvasRef.current.canvasContainer.children[1];
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // composite now
    canvas.getContext("2d").drawImage(background, 0, 0);
    canvas.getContext("2d").globalAlpha = 1.0;
    canvas.getContext("2d").drawImage(drawing, 0, 0);

    const dataUri = canvas.toDataURL("image/jpeg", 1.0);
    const data = dataUri.split(",")[1];
    const mimeType = dataUri.split(";")[0].slice(5);

    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
    }

    const blob = new Blob([arr], { type: mimeType });
    return { blob: blob, dataUri: dataUri };
  };
  const saveImage = (blob, filename) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="relative h-16 px-4 bg-white dark:bg-gray-900 shadow-sm flex justify-between items-center z-999">
      {/* Tools */}
      <div className="flex space-x-2">
        <div
          className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100"
        >
          <FiTrash2 size={"1.4rem"} onClick={handleClear}/>
          <UploadImage fileDataHook={fileDataHook} inputRef={inputRef} />
        </div>
        <div
          className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100"
          onClick={handleUpload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div
          className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:hover:bg-black hover:bg-gray-100"
          onClick={handleDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </div>

      {/* Color Picker */}
      <div
        className="h-8 w-8 cursor-pointer transition rounded-md p-1 dark:text-gray-100 bg-gray-100"
        style={{ backgroundColor: currentBrushColor }}
        onClick={toggleColorPicker}
      ></div>
      {showColorPicker && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 transform mx-0">
          <HexColorPicker color={currentBrushColor} onChange={handleSetColor} />
        </div>
      )}

      <Status />
      {/* Download */}
      {/* <div className="cursor-pointer transition rounded-md p-1 dark:text-gray-100 dark:bg-black bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </div> */}
    </div>
  );
}

export default Footer;
