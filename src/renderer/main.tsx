import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SystemInfoProvider } from "./context/SystemInfoProvider";
import { SidebarProvider } from "./context/SidebarProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SystemInfoProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </SystemInfoProvider>
  </React.StrictMode>,
);
