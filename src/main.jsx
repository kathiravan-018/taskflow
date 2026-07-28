import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import AuthProvider from "./Context/AuthContext";
import BoardProvider from "./Context/BoardContext";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
  <BoardProvider>
    <AuthProvider>
      <App />
      <Toaster richColors position="top-right" />
    </AuthProvider>
    </BoardProvider>
  </BrowserRouter>
</React.StrictMode>
);