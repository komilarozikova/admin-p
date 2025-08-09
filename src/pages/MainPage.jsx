// src/pages/MainPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
