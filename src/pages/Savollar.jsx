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
import { Link } from 'react-router-dom';

function Savollar() {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('/api/avto-test/questions?page=1&limit=10', {
                   headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`,
                },
                });

                console.log("Butun response:", res.data);

                if (Array.isArray(res.data.data)) {
                    setQuestions(res.data.data); // ✅ to‘g‘ri massiv bu yerda
                } else {
                    console.error("❌ Savollar massiv emas.");
                }

            } catch (err) {
                console.error("Xatolik:", err);
            }
        };

        fetchQuestions();
    }, []);

    const totalPages = Math.ceil(questions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentQuestions = questions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
                Test 1 - Savollar
            </Typography>

            <Stack spacing={2}>
                {currentQuestions.map((question, index) => (
                    <Link
                        key={index}
                        to={`${question.id}`}
                        state={{ questionNumber: startIndex + index + 1 }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Card
                            sx={{
                                backgroundColor: '#f3f4f6',
                                borderRadius: 2,
                                boxShadow: 1,
                                padding: 1,
                                marginBottom: 2,
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            
                            <CardContent>
                                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                    Savol {startIndex + index + 1}:
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    {question.question_uz}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Stack>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
}

export default Savollar;
