import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import SavolOptions from "../components/SavolOptions";
import DeleteButton from "../components/DeleteButton";
// import SavolImg from "../components/SavolImj";
import SavolComment from "../components/SavolComment";

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://alibekmoyliyev.uz";

export default function SavolDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [editedUz, setEditedUz] = useState("");
    const [editedRu, setEditedRu] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const location = useLocation();
    const questionNumber = location.state?.questionNumber || "";



 useEffect(() => {
    fetch(`${BASE_URL}/api/avto-test/questions/${id}`)
        .then(async (res) => {
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText);
            }
            return res.json();
        })
        .then((data) => {
            setQuestion(data);
            setEditedUz(data.question_uz || "");
            setEditedRu(data.question_ru || "");
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching question:", err);
            setLoading(false);
        });
}, [id]);


    const handleSave = () => {
        setSaving(true);

        fetch(`${BASE_URL}/api/avto-test/questions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`,
            },
            body: JSON.stringify({
                ...question,
                question_uz: editedUz,
                question_ru: editedRu,
                optionsUz: question.optionsUz, // Qo‘shing
                optionsRu: question.optionsRu, // Qo‘shing
            }),
        })

            .then((res) => {
                if (!res.ok) throw new Error("Failed to update");
                return res.json();
            })
            .then((updatedData) => {
                setQuestion(prev => ({
                    ...prev,
                    ...updatedData,
                }));
            })
            .catch((err) => {
                console.error("Update error:", err);
                alert("Xatolik yuz berdi!");
            })
            .finally(() => setSaving(false));
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 8 }}>
            {/* <SavolImg
                imgUrl={question.imgUrl}
                questionId={question.id}
                comment={question.comment}
                expert_commit={question.expertComment}
                onImageUpload={(newImgUrl) => {
                    // PATCH so‘rovini shu yerda chaqirasan
                    const payload = {
                        ...question,
                        imgUrl: newImgUrl,
                    };
console.log("imgUrl nima:", imgUrl);
                    fetch(`${BASE_URL}/api/avto-test/questions/${question.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`,
                        },
                        body: JSON.stringify(payload),
                    })
                        .then(res => res.json())
                        .then(data => console.log('Yangilandi:', data))
                        .catch(err => console.error('Xatolik:', err));
                }}
                
            /> */}
            {/* Save Button */}
            <Box mb={4} display="flex" container spacing={4} alignItems="stretch" justifyContent={"space-between"}>
                <Typography variant="h5" gutterBottom>
                    Savol {questionNumber}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
            </Box>
            <Grid container spacing={4} alignItems="stretch" justifyContent={"space-between"}>
                {/* O‘zbekcha */}
                <Grid item xs={12} md={6} >
                    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            O‘zbekcha:
                        </Typography>
                        <Typography variant="body1">{question?.question_uz}</Typography>
                        <TextField
                            label="O‘zbekcha savolni tahrirlang"
                            multiline
                            minRows={3}
                            fullWidth
                            value={editedUz}
                            onChange={(e) => setEditedUz(e.target.value)}
                        />
                    </Paper>
                </Grid>

                {/* Русский */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2, width: '500px' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Русский:
                        </Typography>
                        <Typography variant="body1">{question?.question_ru}</Typography>
                        <TextField
                            label="Изменить вопрос (рус)"
                            multiline
                            minRows={3}
                            fullWidth
                            value={editedRu}
                            onChange={(e) => setEditedRu(e.target.value)}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <SavolOptions
                optionsUz={question.optionsUz}
                optionsRu={question.optionsRu}
                setQuestion={setQuestion}
            />


            <SavolComment
                question={question}
                onSave={(updated) => {
                    setQuestion(prev => ({
                        ...prev,
                        ...updated,
                    }));
                }}
            />
            <DeleteButton
                id={question.id}
                onDelete={() => navigate("/main/savollar")} />

        </Box>
    );

}
