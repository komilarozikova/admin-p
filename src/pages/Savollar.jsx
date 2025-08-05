import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Pagination,
    Stack,
} from '@mui/material';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://alibekmoyliyev.uz";

function Savollar() {
    const [questions, setQuestions] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const { page } = useParams(); // URLdan page ni olish
    const currentPage = Number(page) || 1;




    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`;

    // Umumiy sahifa sonini olish
    useEffect(() => {
        const fetchTotalCount = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/avto-test/questions/get-count-questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const totalQuestions = res.data.data.questionSetNumberCount;
                const pages = totalQuestions;
                setTotalPages(pages);
                console.log("Total pages:", pages);
            } catch (error) {
                console.error("Xatolik sahifalar sonini olishda:", error);
            }
        };

        fetchTotalCount();
    }, []);
    // Har bir sahifada 1ta bilet (questionSetNumber) bo‘yicha savollarni olish
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/avto-test/questions/get-questions-for-admin?questionSetNumber=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                setQuestions(res.data.data || []);
            } catch (error) {
                console.error("Xatolik savollarni olishda:", error);
            }
        };

        fetchQuestions();
    }, [currentPage]);

    const handlePageChange = (e, value) => {
        navigate(`/main/savollar/${value}`);
    };
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
                Bilet {currentPage} - Savollar
            </Typography>

            <Stack spacing={2}>
                {questions.map((question, index) => (
                    <Link
                        key={question.id}
                        to={`${question.id}`}
                        state={{
                            questionNumber: index + 1,
                            currentPage: currentPage, 
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Card
                            sx={{
                                backgroundColor: '#f3f4f6',
                                borderRadius: 2,
                                boxShadow: 1,
                                padding: 1,
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Savol {index + 1}:
                                </Typography>
                                <Typography variant="body1">
                                    {question.question_uz}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Stack>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>

            </Box>
        </Box>
    );
}

export default Savollar;
