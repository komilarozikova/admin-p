import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
} from "@mui/material";
import theme from "../themes";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.username === "admin" && form.password === "1234") {
            navigate("/main");
        } else {
            setError("Login yoki parol noto'g'ri!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 32 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Admin Panel Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                    sx={{ mt: 2 }}
                >
                    <TextField
                        label="Login"
                        name="username"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="theme.palette.neutral.main"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.neutral.main,
                            color: "white", // yoki theme.palette.neutral.light
                            "&:hover": {
                                backgroundColor: theme.palette.neutral.dark,
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
