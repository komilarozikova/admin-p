import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3NTU4NDc4MDIsImV4cCI6MTc1NjQ1MjYwMn0.RaAYC8-aaZFqKFjKI3q8Y9U1cdFdBgYWakL9JEeSw1w"); // Tokenni o‘chiradi
        navigate("/"); // Login sahifasiga yo‘naltiradi
    };

    return (
        <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
                position: "absolute",
                left: 20,
                zIndex: 10,
                bottom: 35,
                gap: 2
            }}
        >
            Logout
        </Button>
    );
}
