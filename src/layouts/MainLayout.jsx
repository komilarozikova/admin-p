// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Toggle button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 16,
          left: open ? 250 : 16,
          zIndex: 1300,
          backgroundColor: "#fff",
          boxShadow: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Sidebar open={open} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: open ? "140px" : "0px",
          p: 3,
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
