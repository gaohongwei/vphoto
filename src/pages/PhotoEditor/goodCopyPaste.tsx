import React, { useRef, useState, useEffect } from "react";
import MyPhoto1 from "@/assets/a01.jpeg";
import MyPhoto2 from "@/assets/a02.jpeg";

import { clickEventToCanvasPoint, Point, loadImageIntoCanvas } from "./helper";

const ImageEditor = () => {
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);

  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    loadImageIntoCanvas({
      image: MyPhoto1,
      canvas: firstImageRef.current,
    });

    loadImageIntoCanvas({
      image: MyPhoto2,
      canvas: secondImageRef.current,
    });
  }, []);

  const handleMouseDown = (event) => {
    const { offsetX: x, offsetY: y } = event.nativeEvent;
    setPoints([...points, { x, y }]);
  };

  const handleCopyPaste = () => {
    const firstImageCanvas = firstImageRef.current;
    const secondImageCanvas = secondImageRef.current;

    const len = points.length;
    if (len < 2) {
      console.log("Please select an area first.");
      return;
    }

    const { x: startX, y: startY } = points[0];
    const { x: endX, y: endY } = points[len - 1];

    const firstImageCtx = firstImageCanvas.getContext("2d");
    const secondImageCtx = secondImageCanvas.getContext("2d");

    // Get the selected area from the second image
    const selectedAreaWidth = endX - startX;
    const selectedAreaHeight = endY - startY;

    const selectedAreaData = secondImageCtx.getImageData(
      startX,
      startY,
      selectedAreaWidth,
      selectedAreaHeight
    );

    // Paste the selected area onto the first image
    firstImageCtx.putImageData(selectedAreaData, startX, startY);

    // Clear the selected area
    setPoints([]);
  };

  return (
    <div>
      <span>
        <span>
          <h2>First Image:</h2>
          <canvas ref={firstImageRef} />
        </span>
        <span>
          <h2>Second Image:</h2>
          <canvas ref={secondImageRef} onMouseDown={handleMouseDown} />
        </span>
      </span>

      <button onClick={handleCopyPaste}>Copy and Paste Area</button>
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

/*

display two image side by side. 
Define an area by last two clicked points on the second image, 
high light this area
Add a reset button to clear the selected area
Copy this area with a button. 
paste the selected area  onto  the first image with a click. 
Please use react and typescript
Please use mouse click to determine the selected points
Use points to keep trace the clicked points, and use the first point and last point to determinate the selected area
*/
