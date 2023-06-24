import React, { useState, useRef, useEffect } from "react";

import MyPhoto from "@/assets/a01.jpeg";

import { clickEventToCanvasPoint, Point } from "./helper";

const MyComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = MyPhoto;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      canvas.width = image.width;
      canvas.height = image.height;
    };
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // const { offsetX, offsetY } = event.nativeEvent;
    // const rect = canvas.getBoundingClientRect();
    // const scaleX = canvas.width / rect.width;
    // const scaleY = canvas.height / rect.height;
    // const x = (offsetX - rect.left) * scaleX;
    // const y = (offsetY - rect.top) * scaleY;

    // const newPoint = { x, y };
    const point = clickEventToCanvasPoint({ event, canvasRef });

    setPoints((prevPoints) => [...prevPoints, point]);
  };

  const handleReset = () => {
    setPoints([]);
  };

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   if (!canvas || !ctx) return;

  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   const image = new Image();
  //   image.src = MyPhoto;
  //   image.onload = () => {
  //     ctx.drawImage(image, 0, 0);

  //     if (firstPoint && lastPoint) {
  //       const { x: x1, y: y1 } = firstPoint;
  //       const { x: x2, y: y2 } = lastPoint;

  //       ctx.strokeStyle = "red";
  //       ctx.lineWidth = 2;
  //       ctx.beginPath();
  //       ctx.rect(x1, y1, x2 - x1, y2 - y1);
  //       ctx.stroke();
  //     }
  //   };
  // }, [firstPoint, lastPoint]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ cursor: "crosshair" }}
      />
      <button onClick={handleReset}>Reset</button>
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

export default MyComponent;
