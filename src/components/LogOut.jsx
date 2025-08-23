import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Tokenni o‘chiradi
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
