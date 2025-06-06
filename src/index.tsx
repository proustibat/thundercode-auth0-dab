import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";

async function renderRoot() {
    createRoot(document.getElementById("root") as HTMLElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

renderRoot();
