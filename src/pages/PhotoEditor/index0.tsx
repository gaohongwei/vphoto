import React, { useState } from "react";
import MyPhoto from "@/assets/a01.jpeg";

const ImageSelection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<DOMRect | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedArea(null);
        console.log("reader.result", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAreaSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedImage) {
      const imageElement = event.currentTarget
        .previousSibling as HTMLImageElement;
      const imageRect = imageElement.getBoundingClientRect();
      const areaRect = event.currentTarget.getBoundingClientRect();
      const selectedRect = new DOMRect(
        areaRect.left - imageRect.left,
        areaRect.top - imageRect.top,
        areaRect.width,
        areaRect.height
      );
      setSelectedArea(selectedRect);
      extendArea(selectedRect, imageElement);
    }
  };

  const extendArea = (rect: DOMRect, imageElement: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      context.drawImage(imageElement, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      const targetColor = getPixelColor(
        rect.left,
        rect.top,
        pixelData,
        canvas.width
      );

      const queue: [number, number][] = [[rect.left, rect.top]];
      const visited: Set<string> = new Set();
      while (queue.length > 0) {
        const [x, y] = queue.shift()!;
        if (!visited.has(`${x},${y}`)) {
          visited.add(`${x},${y}`);
          const index = (y * canvas.width + x) * 4;
          const currentColor = [
            pixelData[index],
            pixelData[index + 1],
            pixelData[index + 2],
            pixelData[index + 3],
          ];
          if (isColorEqual(currentColor, targetColor)) {
            pixelData[index] = 255; // Highlight the pixel
            pixelData[index + 1] = 0;
            pixelData[index + 2] = 0;
            pixelData[index + 3] = 255;
            queue.push([x - 1, y]); // Check left neighbor
            queue.push([x + 1, y]); // Check right neighbor
            queue.push([x, y - 1]); // Check top neighbor
            queue.push([x, y + 1]); // Check bottom neighbor
          }
        }
      }

      context.putImageData(imageData, 0, 0);
      const updatedImage = canvas.toDataURL();
      setSelectedImage(updatedImage);
    }
  };

  const getPixelColor = (
    x: number,
    y: number,
    pixelData: Uint8ClampedArray,
    width: number
  ): number[] => {
    const index = (y * width + x) * 4;
    return [
      pixelData[index],
      pixelData[index + 1],
      pixelData[index + 2],
      pixelData[index + 3],
    ];
  };

  const isColorEqual = (color1: number[], color2: number[]): boolean => {
    return (
      color1[0] === color2[0] &&
      color1[1] === color2[1] &&
      color1[2] === color2[2] &&
      color1[3] === color2[3]
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" />
          <div
            style={{
              position: "absolute",
              border: "2px solid red",
              pointerEvents: "none",
              left: selectedArea?.left,
              top: selectedArea?.top,
              width: selectedArea?.width,
              height: selectedArea?.height,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              cursor: "crosshair",
            }}
            onClick={handleAreaSelection}
          />
        </div>
      )}
    </div>
  );
};

export default ImageSelection;
