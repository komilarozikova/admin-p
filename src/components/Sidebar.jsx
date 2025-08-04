// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Quiz as QuizIcon,
  Discount as DiscountIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import LogOut from "./LogOut";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { label: "Savollar", path: "/main/savollar", icon: <QuizIcon /> },
    { label: "Promokodlar", path: "/main/promokodlar", icon: <DiscountIcon /> },
    { label: "Foydalanuvchilar", path: "/main/foydalanuvchilar", icon: <PeopleIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 240 : 72,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: (theme) => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 72,
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          boxSizing: 'border-box',
          paddingTop: 4,
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: open ? "space-between" : "center", px: 2 }}>
        {open && (
          <Typography variant="h6" fontWeight={600}>
            Admin Panel
          </Typography>
        )}
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
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
            <Tooltip title={!open ? item.label : ""} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  paddingY: 1.5,
                  paddingX: open ? 3 : 2,
                  borderRadius: "8px",
                  mx: 1,
                  justifyContent: open ? "flex-start" : "center",
                  "&.Mui-selected": {
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <Box sx={{ minWidth: 32, display: 'flex', justifyContent: 'center' }}>
                  {item.icon}
                </Box>
                {open && (
                  <Box sx={{ ml: 2 }}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 16,
                      }}
                    />
                  </Box>
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <LogOut />
    </Drawer>
  );
};

export default Sidebar;
