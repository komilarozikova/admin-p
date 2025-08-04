import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://alibekmoyliyev.uz";

const SavolImj = ({ imgUrl, questionId, comment, expert_commit, onImageUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    if (!imgUrl && !questionId) return null;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        console.log("📤 Rasm fayli yuborilyapti:", file.name);

        try {
            const formData = new FormData();
            formData.append('uploads', file);

            const response = await fetch(`${BASE_URL}/api/avto-test/uploads/uploads`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`, 
                },
                body: formData,
            });

            const result = await response.json();
            console.log("📥 Serverdan javob:", result);

            const fileUrl = result.data?.url || result.data?.imgUrl || result.data?.path;

            if (!fileUrl) {
                throw new Error("Yuklangan rasm URL topilmadi.");
            }

            let newImgUrl = fileUrl.startsWith("http")
                ? fileUrl
                : `https://${fileUrl}`;

            console.log("🖼️ Yangi rasm URL:", newImgUrl);

            if (onImageUpload) {
                onImageUpload(newImgUrl);
            }
        } catch (err) {
            setError(err.message);
            console.error("❌ Xatolik:", err);
        } finally {
            setUploading(false);
        }
    };
  

    return (
        <Box display="flex" flexDirection="column" alignItems="center" my={4} gap={2}>
            <Box
                component="img"
                src={`${imgUrl}`}
                alt="Null"
                sx={{
                    maxWidth: '650px',
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: 'contain',
                }}
            />

            <Button variant="contained" component="label" disabled={uploading}>
                {uploading ? 'Yuklanmoqda...' : 'Rasmni tanlang'}
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>

            {error && (
                <Typography color="error" fontSize={14}>
                    Xatolik: {error}
                </Typography>
            )}
        </Box>
    );
};

export default SavolImj;
