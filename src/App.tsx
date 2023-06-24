import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import PhotoEditor from "@pg/PhotoEditor/main";

const App: React.FC = () => {
  return (
    <div>
      <h1>Photo Editor</h1>
      <PhotoEditor />
    </div>
  );
};
export default App;
