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
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import SavolOptions from "../components/SavolOptions";
import DeleteButton from "../components/DeleteButton";
import SavolImage from "../components/SavolImage";
import SavolComment from "../components/SavolComment";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchWithAuth } from "../service/fetchWithAuth";

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://api.alibekmoyliyev.uz";

export default function SavolDetails() {
    const { page, id } = useParams(); // page = questionSetNumber, id = current question ID
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [questions, setQuestions] = useState([]); // 💡 shu yerda xatolik bo'lgan
    const [editedUz, setEditedUz] = useState("");
    const [editedRu, setEditedRu] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const location = useLocation();
    const questionNumber = location.state?.questionNumber || "";
    const currentPage = location.state?.currentPage || page;
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);


useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const res = await fetchWithAuth(
                `${BASE_URL}/api/avto-test/questions/get-questions-for-admin?questionSetNumber=${page}`
            );

            const data = await res.json();
            console.log("🔍 Backend javobi savollar:", data);

            const questionList = data.data || [];
            setQuestions(questionList);

            const index = questionList.findIndex(
                q => String(q.id) === String(id)
            );

            if (index !== -1) {
                setCurrentIndex(index);
                setCurrentQuestion(questionList[index]);
            }

            console.log("🟢 Hozirgi savol:", questionList[index]);
        } catch (error) {
            console.error("Xatolik savollarni olishda:", error);
        }
    };

    fetchQuestions();
}, [page, id]);



    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await fetchWithAuth(`${BASE_URL}/api/avto-test/questions/${id}`);
                const data = await res.json();
                console.log("🔍 Backend javobi:", data);
                setQuestion(data);
                setEditedUz(data.questionUz || "");
                setEditedRu(data.questionRu || "");
            } catch (err) {
                console.error("Error fetching question:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);





    const handleSave = async () => {
        setSaving(true);

        try {
            const updatedData = await fetchWithAuth(
                `${BASE_URL}/api/avto-test/questions/${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        ...question,
                        questionUz: editedUz,
                        questionRu: editedRu,
                        optionsUz: question.optionsUz,
                        optionsRu: question.optionsRu,
                    }),
                }
            );

            setQuestion((prev) => ({
                ...prev,
                ...updatedData,
            }));
        } catch (err) {
            console.error("Update error:", err);
            alert("Xatolik yuz berdi!");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = (newImgUrl) => {
        console.log("🟢 Yangi rasm URL keldi:", newImgUrl);

        fetchWithAuth(`${BASE_URL}/api/avto-test/questions/${question.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                ...question,
                imgUrl: newImgUrl,
            }),
        })
            .then((data) => {
                console.log("✅ PATCH muvaffaqiyatli:", data);
                setQuestion((prev) => ({
                    ...prev,
                    imgUrl: newImgUrl,
                }));
            })
            .catch((err) => {
                console.error("❌ PATCH xatolik:", err);
            });
    };

    if (loading) return <CircularProgress />;

    const goToPrev = () => {
        if (currentIndex > 0) {
            const prevId = questions[currentIndex - 1].id;
            navigate(`/main/savollar/${page}/${prevId}`, {
                state: {
                    questionNumber: currentIndex,       // 0-based => Savol 1 uchun index = 0
                    currentPage: page,
                }
            });
        }
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            const nextId = questions[currentIndex + 1].id;
            navigate(`/main/savollar/${page}/${nextId}`, {
                state: {
                    questionNumber: currentIndex + 2,   // 1-based raqam
                    currentPage: page,
                }
            });
        }
    };


    if (!currentQuestion) return <Typography>Yuklanmoqda...</Typography>;
    console.log(currentPage)
    console.log(questionNumber)
    return (
        <Box >
            <AppBar
                position="sticky"
                elevation={4} // shadow chuqurligi: 0 - 24 oralig'ida
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    px: 2,

                }}
            >
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton color="inherit" onClick={() => navigate(`/main/savollar/${page}`)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="subtitle1">Bilet: {currentPage}</Typography>
                        <Typography variant="subtitle1">Savol: {questionNumber}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton color="error">
                            <DeleteButton id={question.id}
                                onDelete={() => navigate("/main/savollar")} />
                        </IconButton>
                        <Button
                            onClick={goToPrev}
                            disabled={currentIndex === 0}
                            variant="outlined"
                        >
                            Oldingi
                        </Button>
                        <Button
                            onClick={goToNext}
                            sx={{ mr: 2 }}
                            disabled={currentIndex === questions.length - 1}
                            variant="outlined"
                        >
                            Keyingi
                        </Button>
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
                </Toolbar>
            </AppBar>
            <Box sx={{ pl: 10, pr: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between", mb: 3 }}>
                </Box>
                <SavolImage
                    imgUrl={question.imgUrl}
                    questionId={question.id}
                    comment={question.comment}
                    expert_commit={question.expertComment}
                    onImageUpload={handleImageUpload}
                />
                <Grid container spacing={4} justifyContent={"space-between"} marginTop={'20px'}>
                    {/* O‘zbekcha */}
                    <Grid item xs={12} md={6} width={"48%"}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                O‘zbekcha:
                            </Typography>
                            <Typography variant="body1">{question?.questionUz}</Typography>
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
                    <Grid item xs={12} md={6} width={"48%"}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Русский:
                            </Typography>
                            <Typography variant="body1">{question?.questionRu}</Typography>
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
            </Box>
        </Box>
    );

}