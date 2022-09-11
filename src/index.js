import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppProviders from "./AppProviders";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
