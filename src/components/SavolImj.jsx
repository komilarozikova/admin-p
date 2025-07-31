import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const SavolImg = ({ imgUrl, questionId, comment, expert_commit, onImageUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    if (!imgUrl && !questionId) return null;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError(null);



        try {
            const formData = new FormData();
            formData.append('uploads', file);
            console.log("Yuborilayotgan fayl:", file);
            console.log("FormData preview:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            const response = await fetch('/api/avto-test/uploads/uploads', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`, // Token shu yerda
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Rasm yuklanmadi');
            }

            let newImgUrl = data.imgUrl || data.url;
            if (!newImgUrl && file.name) {
                newImgUrl = `alibekmoyliyev.uz/uploads/${file.name}`;
            }
            if (onImageUpload) onImageUpload(newImgUrl); // PATCH uchun tashqariga yuboriladi

        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" my={4} gap={2}>
            <Box
                component="img"
                src={`https://${imgUrl}`}
                alt="Savol rasmi"
                sx={{
                    maxWidth: '650px',
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: 'contain',
                }}
            />

            <Button
                variant="contained"
                component="label"
                disabled={uploading}
            >
                {uploading ? 'Yuklanmoqda...' : 'Rasmni tanlang'}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>

            {error && (
                <Typography color="error" fontSize={14}>
                    Xatolik: {error}
                </Typography>
            )}
        </Box>
    );
};

export default SavolImg;
