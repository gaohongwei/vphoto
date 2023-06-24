import React, { useState, useRef } from "react";
import MyPhoto1 from "@/assets/a01.jpeg";
import MyPhoto2 from "@/assets/a02.jpeg";

import { getEventPoint, Point, loadImageIntoCanvas } from "./helper";

const ImageEditor = () => {
  const firstImageRef = useRef<HTMLCanvasElement>(null);
  const secondImageRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedArea, setSelectedArea] = useState<DOMRect | null>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    // const rect = event.currentTarget.getBoundingClientRect();
    // const offsetX = event.clientX - rect.left;
    // const offsetY = event.clientY - rect.top;
    const newPoint = getEventPoint(event);

    const newPoints = [...points, newPoint];

    drawSelectedArea(newPoints);

    setPoints(newPoints);
  };

  const handleReset = () => {
    setPoints([]);
    setSelectedArea(null);
  };

  const drawSelectedArea = (newPoints: Point[]) => {
    const len = newPoints.length;
    if (len < 2) {
      return;
    }
    const firstPoint = newPoints[0];
    const secondPoint = newPoints[len - 1];
    // eslint-disable-next-line no-debugger
    debugger;
    const x = Math.min(firstPoint.x, secondPoint.x);
    const y = Math.min(firstPoint.y, secondPoint.y);
    const width = Math.abs(firstPoint.x - secondPoint.x);
    const height = Math.abs(firstPoint.y - secondPoint.y);
    const secondImageCanvas = secondImageRef.current;
    const secondImageCtx = secondImageCanvas?.getContext("2d");
    secondImageCtx.fillStyle = "blue";
    secondImageCtx.fillRect(x, y, width, height);
  };

  const handleCopy = () => {
    const secondImageCanvas = secondImageRef.current;
    const secondImageCtx = secondImageCanvas?.getContext("2d");

    if (secondImageCtx && selectedArea) {
      const { x, y, width, height } = selectedArea;
      const imageData = secondImageCtx.getImageData(x, y, width, height);
      // Copy the selected area to clipboard or perform desired action
      console.log("Copied:", imageData);
    }
  };

  const handlePaste = () => {
    const firstImageCanvas = firstImageRef.current;
    const firstImageCtx = firstImageCanvas?.getContext("2d");

    if (firstImageCtx && selectedArea) {
      const { x, y } = selectedArea;
      // Paste the selected area onto the first image
      // Perform desired action
      console.log("Pasted onto first image:", selectedArea);
    }
  };

  return (
    <div>
      <div>
        <h2>First Image:</h2>
        <img ref={firstImageRef} src={MyPhoto1} alt="First Image" />
      </div>
      <div>
        <h2>Second Image:</h2>
        <img
          ref={secondImageRef}
          src={MyPhoto2}
          alt="Second Image"
          onClick={handleImageClick}
        />
        {selectedArea && (
          <div
            style={{
              position: "absolute",
              top: selectedArea.y,
              left: selectedArea.x,
              width: selectedArea.width,
              height: selectedArea.height,
              border: "2px dashed red",
            }}
          />
        )}
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handlePaste}>Paste</button>
      </div>
      <ul>
        {points.map((point, index) => (
          <li key={index}>
            Point {index + 1}: x={point.x}, y={point.y}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageEditor;
