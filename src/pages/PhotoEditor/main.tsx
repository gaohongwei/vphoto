import React, { useState, useRef, useEffect } from "react";
import { Slider, InputNumber } from "antd";
import MyPhoto1 from "@/assets/twopeople.jpeg";
import MyPhoto2 from "@/assets/wei.jpeg";
import {
  getEventPoint,
  Point,
  drawRect,
  loadImageIntoCanvas,
  getSelectedArea,
} from "./helper";

const ImageEditor = () => {
  const firstImageRef = useRef<HTMLCanvasElement>(null);
  const secondImageRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [imageScale, setImageScale] = useState(1.0);
  const [selectedArea, setSelectedArea] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleImageClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
    isFirstImage: boolean
  ) => {
    const newPoint = getEventPoint(event);
    const newPoints = [...points, newPoint];
    drawRect({
      points: newPoints,
      canvas: secondImageRef.current,
    });

    setPoints(newPoints);
  };

  const onPaste = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const newPoint = getEventPoint(event);
    const firstImageCanvas = firstImageRef.current;
    const firstImageCtx = firstImageCanvas?.getContext("2d");
    const secondImageCanvas = secondImageRef.current;
    const secondImageCtx = secondImageCanvas?.getContext("2d");

    if (firstImageCtx && secondImageCtx) {
      const { x, y, width, height } = getSelectedArea(points);
      const imageData = secondImageCtx.getImageData(x, y, width, height);
      firstImageCtx?.putImageData(imageData, newPoint.x, newPoint.y);
      // Paste the selected area onto the first image
      // Perform desired action
      console.log("Pasted onto first image:", selectedArea);
    }
  };

  const handleReset = () => {
    setPoints([]);
  };

  const handleCopy = () => {
    const secondImageCanvas = secondImageRef.current;
    const secondImageCtx = secondImageCanvas?.getContext("2d");

    if (secondImageCtx) {
      const { x, y, width, height } = getSelectedArea(points);
      const imageData = secondImageCtx.getImageData(x, y, width, height);
      // Copy the selected area to clipboard or perform desired action
      console.log("Copied:", imageData);
    }
  };

  const handlePaste = () => {
    const firstImageCanvas = firstImageRef.current;
    const firstImageCtx = firstImageCanvas?.getContext("2d");
    const secondImageCanvas = secondImageRef.current;
    const secondImageCtx = secondImageCanvas?.getContext("2d");

    if (firstImageCtx) {
      const { x, y, width, height } = getSelectedArea(points);
      const imageData = secondImageCtx.getImageData(x, y, width, height);
      firstImageCtx?.putImageData(imageData, 0, 0);
      // Paste the selected area onto the first image
      // Perform desired action
      console.log("Pasted onto first image:", selectedArea);
    }
  };

  useEffect(() => {
    loadImageIntoCanvas({ image: MyPhoto1, canvas: firstImageRef.current });
    loadImageIntoCanvas({
      image: MyPhoto2,
      canvas: secondImageRef.current,
      imageScale,
    });
    console.log("useEffect");
  }, [imageScale]);

  const onScaleChange = (newValue: number) => {
    setTimeout(() => {
      setImageScale(newValue);
    }, 500);
  };

  return (
    <>
      imageScale
      <InputNumber
        min={0.1}
        max={10}
        defaultValue={1.0}
        step={0.1}
        onChange={onScaleChange}
      />
      <div style={{ display: "flex" }}>
        <div>
          <h2>First Image:</h2>
          <canvas
            ref={firstImageRef}
            width={500}
            height={500}
            onClick={(e) => onPaste(e, false)}
          />
        </div>
        <div>
          <h2>Second Image:</h2>
          <canvas
            ref={secondImageRef}
            width={500}
            height={500}
            onClick={(e) => handleImageClick(e, false)}
          />
        </div>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handlePaste}>Paste</button>
      </div>
    </>
  );
};

export default ImageEditor;
