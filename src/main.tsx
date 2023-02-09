import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataControllContextProvider } from "./contexts/DataControllContext";
import { StateContextProvider } from "./contexts/StateContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContextProvider>
        <DataControllContextProvider>
          <App />
        </DataControllContextProvider>
      </StateContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
