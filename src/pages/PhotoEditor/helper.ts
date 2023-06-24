export type Point = {
  x: number;
  y: number;
};

export const getEventPoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return {
    x,
    y,
  };
};
export const clickEventToCanvasPoint = ({
  event,
  canvasRef,
}: {
  event: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: any;
}) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    return { x: 0, y: 0 };
  }

  const canvasRect = canvas.getBoundingClientRect();

  const mouseX = event.clientX - canvasRect.left;
  const mouseY = event.clientY - canvasRect.top;

  return {
    x: mouseX,
    y: mouseY,
  };
};

export const loadImageIntoCanvas = ({
  image,
  canvas,
  imageScale = 1.0,
}: {
  image: string;
  canvas: HTMLCanvasElement | null;
  imageScale?: number;
}) => {
  const imageObj = new Image();
  imageObj.src = image;
  imageObj.onload = () => {
    const imageContext = canvas.getContext("2d");
    const scaledWidth = imageObj.width * imageScale;
    const scaledHeight = imageObj.height * imageScale;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    imageContext.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    imageContext.drawImage(imageObj, 0, 0, scaledWidth, scaledHeight);
  };
};

export const getSelectedArea = (points: Point[]) => {
  const len = points.length;
  if (len < 2) {
    return {};
  }

  const point1 = points[len - 2];
  const point2 = points[len - 1];

  const x = Math.min(point1.x, point2.x);
  const y = Math.min(point1.y, point2.y);
  const width = Math.abs(point1.x - point2.x);
  const height = Math.abs(point1.y - point2.y);
  return { x, y, width, height };
};
// Draw a rectangle on the canvas
export const drawRect = ({
  points,
  canvas = null,
}: {
  points: Point[];
  canvas?: HTMLCanvasElement | null;
}) => {
  if (!canvas) return;
  const len = points.length;
  if (len < 2) {
    return;
  }

  const { x, y, width, height } = getSelectedArea(points);

  const secondImageCtx = canvas?.getContext("2d");
  if (secondImageCtx) {
    secondImageCtx.strokeStyle = "red"; // Set the stroke color
    secondImageCtx.lineWidth = 2; // Set the stroke width
    // secondImageCtx.fillStyle = "blue";

    secondImageCtx.beginPath();
    secondImageCtx.rect(x, y, width, height);
    secondImageCtx.stroke();
  }
};
/*
import { clickEventToCanvasPoint, Point } from "./helper";
import Photo1 from "@/assets/a01.jpeg";
import Photo2 from "@/assets/a02.jpeg";

*/
