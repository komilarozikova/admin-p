// components/DeleteButton.jsx

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    if (!id) {
      alert("ID topilmadi.");
      return;
    }

    const confirmDelete = window.confirm(
      "Rostdan ham bu savolni va barcha variantlarini o‘chirmoqchimisiz?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/api/avto-test/questions/${id}`, {
        method: "DELETE",
         headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NThmZGVhMS1iMGRhLTRjZjYtYmRmZS00MmMyYjg0ZjMzZjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM1MzE4ODksImV4cCI6MTc1NDEzNjY4OX0.uV4yR2tCKnfHteyr0N6exV7FRMeiX2AWIlZGAIiHhdw`,
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
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      O‘chirish
    </Button>
  );
};

export default DeleteButton;
