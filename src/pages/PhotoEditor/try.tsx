import React, { useRef, useEffect, useState } from "react";
import MyPhoto1 from "@/assets/twopeople.jpeg";
import {
  getEventPoint,
  Point,
  drawRect,
  loadImageIntoCanvas,
  getSelectedArea,
} from "./helper";

const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    loadImageIntoCanvas({ image: MyPhoto1, canvas: canvasRef.current });
    setSize({ width: canvas?.width || 0, height: canvas?.height || 0 });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // const canvas = canvasRef.current;
    // if (canvas) {
    //   setDragging(true);
    //   setDragStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    // }
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the new size based on the mouse position
      const newWidth = e.nativeEvent.offsetX - dragStartPos.x;
      const newHeight = e.nativeEvent.offsetY - dragStartPos.y;

      // Draw the image with the new size
      const image = new Image();
      image.src = MyPhoto1;
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      // Update the size state
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (canvas && dragging) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the new size based on the mouse position
        const newWidth = e.nativeEvent.offsetX - dragStartPos.x;
        const newHeight = e.nativeEvent.offsetY - dragStartPos.y;

        // Draw the image with the new size
        const image = new Image();
        image.src = MyPhoto1;
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        // Update the size state
        setSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ImageCanvas;
