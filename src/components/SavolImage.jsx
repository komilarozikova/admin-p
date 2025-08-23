import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { fetchWithAuth } from '../service/fetchWithAuth';

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://api.alibekmoyliyev.uz";

const SavolImage = ({ imgUrl, questionId, comment, expert_commit, onImageUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("access_token");


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

            const response = await fetchWithAuth(`${BASE_URL}/api/avto-test/uploads/uploads`, {
                method: 'POST',
                body: formData,
            });
            console.log(response);
            const result = await response.json();
            console.log("📥 Serverdan javob:", result);
            console.log("imgUrl:", imgUrl);


            const fileUrl = result.data?.url || result.data?.imgUrl || result.data?.path;
            console.log(fileUrl);
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
    if (!imgUrl) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography color="text.secondary" fontSize={14} my={2}>
                    Null

                </Typography>

                <Button variant="outlined" color='#3c3c3c' component="label" disabled={uploading}>
                    {uploading ? 'Yuklanmoqda...' : 'Rasmni tanlang'}
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
            </Box>
        );
    }


    const imageUrl = imgUrl.startsWith("http")
        ? imgUrl
        : `https://${imgUrl}`;

    return (
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Box flexDirection="column" alignItems="center" my={4} gap={2} position="relative" display="inline-block">
                <Box
                    component="img"
                    src={imageUrl}
                    alt="Rasm"
                    sx={{
                        maxWidth: '450px',
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 3,
                        objectFit: 'contain',
                        display: 'block'
                    }}
                />
                <IconButton
                    component="label"
                    disabled={uploading}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.542)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.8)'
                        }
                    }}
                >
                    {uploading ? '⏳' : <EditIcon />}
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </IconButton>
             
            </Box>
               {error && (
                    <Typography color="error" fontSize={14}>
                        Xatolik: {error}
                    </Typography>
                )}
        </Box>
    );
};

export default SavolImage;
