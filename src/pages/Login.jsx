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

const BASE_URL =
  import.meta.env.DEV ? "/api" : "https://api.alibekmoyliyev.uz";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/avto-test/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login yoki parol noto‘g‘ri!");
      }

      const data = await res.json();

      // ⚡️ Token swagger response ichida `data.token` da bo‘ladi
      localStorage.setItem("token", data.data.token);
     console.log(data.data.token)
      navigate("/main");
    } catch (err) {
      setError(err.message);
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
            label="Phone"
            name="phone"
            type="text"
            fullWidth
            margin="normal"
            value={form.phone}
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
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: theme.palette.neutral.main,
              color: "white",
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
