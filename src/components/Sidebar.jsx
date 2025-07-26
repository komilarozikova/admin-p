// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import theme from "../themes";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Savollar", path: "/main/savollar" },
    { label: "Promokodlar", path: "/main/promokodlar" },
    { label: "Testlar", path: "/main/testlar" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          paddingTop: 4,
          borderRight: "1px solid #e0e0e0",
        //   backgroundColor: theme.palette.neutral.dark,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600}>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{
              marginY: 1,
            }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                paddingY: 1.5,
                paddingX: 3,
                borderRadius: "8px",
                mx: 1,
                "&.Mui-selected": {
                  backgroundColor: "#f0f0f0",
                  fontWeight: "bold",
                },
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 16,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
