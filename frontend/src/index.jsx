import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Callback from "./Callback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
