import React, { useRef, useState } from "react";

const ImageEditor = () => {
  const originalCanvasRef = useRef(null);
  const copiedCanvasRef = useRef(null);
  const [copiedArea, setCopiedArea] = useState(null);

  const handleCopy = () => {
    const originalCanvas = originalCanvasRef.current;
    const ctx = originalCanvas.getContext("2d");

    // Get the selected area coordinates
    const selectionX = 100; // X-coordinate of the top-left corner of the selected area
    const selectionY = 100; // Y-coordinate of the top-left corner of the selected area
    const selectionWidth = 200; // Width of the selected area
    const selectionHeight = 200; // Height of the selected area

    // Create a temporary canvas to store the selected area
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = selectionWidth;
    tempCanvas.height = selectionHeight;
    const tempCtx = tempCanvas.getContext("2d");

    // Copy the selected area to the temporary canvas
    tempCtx.drawImage(
      originalCanvas,
      selectionX,
      selectionY,
      selectionWidth,
      selectionHeight,
      0,
      0,
      selectionWidth,
      selectionHeight
    );

    // Update the copied area state
    setCopiedArea(tempCanvas.toDataURL());
  };

  return (
    <div>
      <canvas ref={originalCanvasRef} />
      <button onClick={handleCopy}>Copy Image Area</button>
      {copiedArea && (
        <div>
          <h2>Copied Area:</h2>
          <img src={copiedArea} alt="Copied Area" ref={copiedCanvasRef} />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
