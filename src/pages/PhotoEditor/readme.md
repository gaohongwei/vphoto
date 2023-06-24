Requirement 1:
Please display an Image in canvas. Allow user to click within the Image, add clicked point into an point array points. draw a rectangle with the first point of points and the last point of the points. And add a reset button.Use typescript. The image is imported as:
import MyPhoto from "@/assets/a01.jpeg";

Requirement: 0. Please write in react and typescript

1. User can select an image, and app display the image. User can select an area. The the app extend the area as much as possible until the color changed. the app high light this are.

# Doc

- reader.readAsDataURL(file)
  - Read image into base64 encoded string
  - <img src={base64String} alt="Selected" />
- reader.onloadend
  - fired when a file read has completed, successfully or not.

# canvas、context

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

# Image data

- represents the underlying pixel data of an area of a <canvas> element.
-
- copy an area of an image
  - const imageData = ctx.getImageData(10, 20, 80, 230);
- paste into canvas
  - ctx.putImageData(imageData, 260, 0);
