import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Tool from "./Tool";
import "./style.css";

const root = document.getElementById("tool-root");
if (!root) {
    throw new Error("Missing #tool-root mount point");
}

createRoot(root).render(
    <StrictMode>
        <Tool />
    </StrictMode>
);
