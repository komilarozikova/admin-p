import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SavolOptions = ({ optionsUz = [], optionsRu = [], setQuestion }) => {
  const [editingOptionId, setEditingOptionId] = useState(null);
  const [editingLang, setEditingLang] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleEdit = (option, lang) => {
    setEditingOptionId(option.id);
    setEditingLang(lang);
    setEditingValue(option.value);
  };

  const handleSave = (option, lang, newValue) => {
    setSaving(true);

    const updatedOption = { ...option, value: newValue };

    fetch(`/api/avto-test/options/${option.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`,
      },
      body: JSON.stringify(updatedOption),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Optionni saqlashda xatolik!");
        return res.json();
      })
      .then((updatedData) => {
        setQuestion((prev) => {
          const key =
            lang === "uz" ? "optionsUz" : lang === "ru" ? "optionsRu" : "optionsEn";

          return {
            ...prev,
            [key]: prev[key].map((opt) =>
              opt.id === updatedData.id ? updatedData : opt
            ),
          };
        });
        setEditingOptionId(null);
        setEditingLang(null);
      })
      .catch((err) => {
        console.error("Option saqlash xatosi:", err);
        alert("Variantni saqlab bo‘lmadi.");
      })
      .finally(() => setSaving(false));
  };

  const renderOption = (opt, index, lang) => {
    const isEditing = editingOptionId === opt.id && editingLang === lang;

    return (
      <Paper
        key={`${lang}-${opt.id}`}
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: opt.isCorrect ? "#e6ffe6" : "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => !isEditing && handleEdit(opt, lang)}
      >
        {isEditing ? (
          <>
            <TextField
              fullWidth
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              size="small"
            />
            <IconButton
              onClick={() => handleSave(opt, lang, editingValue)}
              disabled={saving}
            >
              <CheckIcon color="success" />
            </IconButton>
          </>
        ) : (
          <Typography variant="body1">
            {index + 1}. {opt.value}
          </Typography>
        )}
      </Paper>
    );
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Variantlar (UZ / RU)
      </Typography>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={6} width={"500px"}>
          <Typography variant="subtitle1" gutterBottom>
            O'zbekcha
          </Typography>
          {optionsUz.map((opt, idx) => renderOption(opt, idx, "uz"))}
        </Grid>
        <Grid item xs={12} md={6} width={"500px"}>
          <Typography variant="subtitle1" gutterBottom>
            Русский
          </Typography>
          {optionsRu.map((opt, idx) => renderOption(opt, idx, "ru"))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SavolOptions;
