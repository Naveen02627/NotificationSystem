import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      gutter={10}
      toastOptions={{ style: { background: "transparent", boxShadow: "none", padding: 0 } }}
    />
  </StrictMode>
);
