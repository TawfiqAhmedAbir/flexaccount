import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      /* no-op for demo */
    });
  });
}

// Collapse any browser history so iOS standalone mode does not show
// the system back chevron over the status bar.
window.history.replaceState(null, "", window.location.pathname + window.location.search);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
