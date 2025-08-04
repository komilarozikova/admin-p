import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw"); // Tokenni o‘chiradi
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
                top: 16,
                right: 16,
                zIndex: 10,
            }}
        >
            Logout
        </Button>
    );
}
