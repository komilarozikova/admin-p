import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function SavolComment({ question, onSave }) {
    const [comment, setComment] = useState(question.comment || "");
    const [expertComment, setExpertComment] = useState(question.expertComment || "");
    const [commentRu, setCommentRu] = useState(question.commentRu || "");
    const [expertCommentRu, setExpertCommentRu] = useState(question.expertCommentRu || "");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [lastSavedComment, setLastSavedComment] = useState(null);

    // ✅ localStorage dan oxirgi commentni olish
    useEffect(() => {
        const saved = localStorage.getItem(`comment-${question.id}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            setLastSavedComment(parsed);
            setComment(parsed.comment);
            setExpertComment(parsed.expertComment);
            setCommentRu(parsed.commentRu);
            setExpertCommentRu(parsed.expertCommentRu);

            setComment("");
            setExpertComment("");
            setCommentRu("");
            setExpertCommentRu("");
        }
    }, [question.id]);


    const handleSave = async () => {
        setSaving(true);
        setSaved(false);

        try {
            // Eski izohlar agar input bo'sh bo'lsa, ulardan foydalanamiz
            const savedCommentData = {
                comment: comment.trim() === "" ? lastSavedComment?.comment || "" : comment,
                expertComment: expertComment.trim() === "" ? lastSavedComment?.expertComment || "" : expertComment,
                commentRu: commentRu.trim() === "" ? lastSavedComment?.commentRu || "" : commentRu,
                expertCommentRu: expertCommentRu.trim() === "" ? lastSavedComment?.expertCommentRu || "" : expertCommentRu,
            };

            const response = await fetch(`/api/avto-test/questions/${question.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`, // qisqartirganing yaxshi
                },
                body: JSON.stringify({
                    ...question,
                    ...savedCommentData,
                }),
            });

            if (!response.ok) throw new Error("Xatolik yuz berdi!");

            const updated = await response.json();

            // localStorage'ga ham shu saqlanayotgan qiymatni yozamiz
            localStorage.setItem(`comment-${question.id}`, JSON.stringify(savedCommentData));

            setSaved(true);
            setLastSavedComment(savedCommentData);

            setComment("");
            setExpertComment("");


            onSave && onSave(updated);
        } catch (err) {
            console.error(err);
            alert("Izohlarni saqlashda xatolik yuz berdi.");
        } finally {
            setSaving(false);
        }
    };
    const handleDeleteComment = async () => {
        const updated = {
            ...lastSavedComment,
            comment: "",
            commentRu: "",
        };
        setLastSavedComment(updated);
        localStorage.setItem(`comment-${question.id}`, JSON.stringify(updated));

        try {
            await fetch(`/api/avto-test/questions/${question.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ...`, // token shu yerda
                },
                body: JSON.stringify({
                    ...question,
                    comment: "",
                    commentRu: "",
                    expertComment: updated.expertComment,
                    expertCommentRu: updated.expertCommentRu,
                }),
            });
        } catch (err) {
            console.error("O‘chirishda xatolik:", err);
            alert("Izohni serverdan o‘chirishda xatolik yuz berdi.");
        }
    };

    const handleDeleteExpertComment = async () => {
        const updated = {
            ...lastSavedComment,
            expertComment: "",
            expertCommentRu: "",
        };
        setLastSavedComment(updated);
        localStorage.setItem(`comment-${question.id}`, JSON.stringify(updated));

        try {
            await fetch(`/api/avto-test/questions/${question.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ...`, // token shu yerda
                },
                body: JSON.stringify({
                    ...question,
                    comment: updated.comment,
                    commentRu: updated.commentRu,
                    expertComment: "",
                    expertCommentRu: "",
                }),
            });
        } catch (err) {
            console.error("Ekspert izohini o‘chirishda xatolik:", err);
            alert("Ekspert izohini serverdan o‘chirishda xatolik yuz berdi.");
        }
    };


    return (
        <Box mt={4} mb={4} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Izohlar</Typography>

            <Box mt={4} mb={4} display="flex" flexDirection="row" gap={4}>
                {/* O'zbekcha blok */}
                <Box flex={1} display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h6">O'zbekcha izohlar</Typography>

                    <TextField
                        label="Foydalanuvchi izohi (UZ)"
                        multiline
                        fullWidth
                        minRows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <TextField
                        label="Ekspert izohi (UZ)"
                        multiline
                        fullWidth
                        minRows={3}
                        value={expertComment}
                        onChange={(e) => setExpertComment(e.target.value)}
                    />
                </Box>

                {/* Ruscha blok */}
                <Box flex={1} display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h6">Русские комментарии</Typography>

                    <TextField
                        label="Комментарий пользователя (RU)"
                        multiline
                        fullWidth
                        minRows={3}
                        value={commentRu}
                        onChange={(e) => setCommentRu(e.target.value)}
                    />
                    <TextField
                        label="Комментарий эксперта (RU)"
                        multiline
                        fullWidth
                        minRows={3}
                        value={expertCommentRu}
                        onChange={(e) => setExpertCommentRu(e.target.value)}
                    />
                </Box>
            </Box>

            <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saqlanmoqda..." : "Izohlarni saqlash"}
            </Button>

            {saved && (
                <Typography color="success.main">✅ Saqlandi!</Typography>
            )}

            {lastSavedComment && (
                <Box mt={2} display="flex" gap={2}>
                    {/* Uzbekcha blok */}
                    <Box flex={1} display="flex" flexDirection="column" gap={2}>
                        {/* Foydalanuvchi izohi */}
                        <Box bgcolor="#f5f5f5" p={2} borderRadius={2} position="relative">
                            <IconButton
                                size="small"
                                onClick={handleDeleteComment}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                                aria-label="Foydalanuvchi izohini o‘chirish"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Foydalanuvchi izohi
                            </Typography>
                            <Typography>{lastSavedComment.comment || "(yo'q)"}</Typography>
                        </Box>

                        {/* Ekspert izohi */}
                        <Box bgcolor="#f5f5f5" p={2} borderRadius={2} position="relative">
                            <IconButton
                                size="small"
                                onClick={handleDeleteExpertComment}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                                aria-label="Ekspert izohini o‘chirish"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Ekspert izohi
                            </Typography>
                            <Typography>{lastSavedComment.expertComment || "(yo'q)"}</Typography>
                        </Box>
                    </Box>

                    {/* Ruscha blok (o‘ngda) */}
                    <Box flex={1} display="flex" flexDirection="column" gap={2}>
                        {/* Foydalanuvchi izohi */}
                        <Box bgcolor="#f5f5f5" p={2} borderRadius={2} position="relative">
                            <IconButton
                                size="small"
                                onClick={handleDeleteComment}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                                aria-label="RU kommentariyani o‘chirish"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Комментарий пользователя (RU)
                            </Typography>
                            <Typography>{lastSavedComment.commentRu || "(нет)"}</Typography>
                        </Box>

                        {/* Ekspert izohi */}
                        <Box bgcolor="#f5f5f5" p={2} borderRadius={2} position="relative">
                            <IconButton
                                size="small"
                                onClick={handleDeleteExpertComment}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                                aria-label="RU эксперт комментарийни o‘chirish"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Комментарий эксперта (RU)
                            </Typography>
                            <Typography>{lastSavedComment.expertCommentRu || "(нет)"}</Typography>
                        </Box>
                    </Box>
                </Box>


            )}
        </Box>
    );
}
