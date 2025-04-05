import React from "react";
import { createRoot } from "react-dom/client"; // ✅ New import for React 18
import App from "./App"; // ✅ File name is good
import "./index.css"; // ✅ Make sure index.css exists

const container = document.getElementById("root");
const root = createRoot(container); // ✅ React 18 root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
