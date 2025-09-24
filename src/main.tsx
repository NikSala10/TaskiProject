import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToDoProvider } from "./context/ToDoContext.tsx";
import { PageProvider } from "./context/PageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToDoProvider>
      <PageProvider>
        <App />
      </PageProvider>
    </ToDoProvider>
  </StrictMode>
);
