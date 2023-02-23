import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DataControlProvider } from "./contexts/DataControlContext";
import { ApplicationControlProvider } from "./contexts/ApplicationControlContext";
import "./index.css";
import { AuthControlProvider } from "./contexts/AuthControlContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthControlProvider>
        <ApplicationControlProvider>
          <DataControlProvider>
            <App />
          </DataControlProvider>
        </ApplicationControlProvider>
      </AuthControlProvider>
    </BrowserRouter>
  </React.StrictMode>
);
