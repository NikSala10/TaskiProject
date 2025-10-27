import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PageProvider } from "./context/PageContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PageProvider>
  </StrictMode>
);
