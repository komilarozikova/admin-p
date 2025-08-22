// components/DeleteButton.jsx

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL =
    import.meta.env.DEV
        ? "/api"
        : "https://api.alibekmoyliyev.uz";
        
const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    if (!id) {
      alert("ID topilmadi.");
      console.log(id)
      return;
    }

    const confirmDelete = window.confirm(
      "Rostdan ham bu savolni va barcha variantlarini o‘chirmoqchimisiz?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/api/avto-test/questions/${id}`, {
        method: "DELETE",
         headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3NTU4NDc4MDIsImV4cCI6MTc1NjQ1MjYwMn0.RaAYC8-aaZFqKFjKI3q8Y9U1cdFdBgYWakL9JEeSw1w`,
            },
      });

      if (!response.ok) {
        throw new Error("O‘chirishda xatolik");
      }

      alert("Savol muvaffaqiyatli o‘chirildi.");

      if (onDelete) {
        onDelete(); // Parent komponentga callback yuborish (masalan: ro'yxatni yangilash)
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi. Savol o‘chirilmadi.");
    }
  };

  return (
    <Button
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
    </Button>
  );
};

export default DeleteButton;
