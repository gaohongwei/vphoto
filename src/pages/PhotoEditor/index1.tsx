import React, { useState } from "react";
import MyPhoto from "@/assets/a01.jpeg";

interface Point {
  x: number;
  y: number;
}

const RectangleDrawer: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newPoint: Point = { x, y };

    setPoints([...points, newPoint]);
  };

  const resetPoints = () => {
    setPoints([]);
  };

  const renderRectangle = () => {
    if (points.length >= 2) {
      const startPoint = points[0];
      const endPoint = points[points.length - 1];

      const minX = Math.min(startPoint.x, endPoint.x);
      const minY = Math.min(startPoint.y, endPoint.y);
      const maxX = Math.max(startPoint.x, endPoint.x);
      const maxY = Math.max(startPoint.y, endPoint.y);
      const width = maxX - minX;
      const height = maxY - minY;

      const rectangleStyle = {
        position: "absolute",
        border: "2px solid red",
        left: `${minX}px`,
        top: `${minY}px`,
        width: `${width}px`,
        height: `${height}px`,
      };

      return <div style={rectangleStyle}></div>;
    }
  };

  return (
    <div>
      <img
        src={MyPhoto}
        alt="Image"
        onClick={handleImageClick}
        style={{ position: "relative" }}
      />
      {renderRectangle()}
      <button onClick={resetPoints}>Reset</button>
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

export default RectangleDrawer;
