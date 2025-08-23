// components/DeleteButton.jsx

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchWithAuth } from "../service/fetchWithAuth";

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
      const response = await fetchWithAuth(`${BASE_URL}/api/avto-test/questions/${id}`, {
        method: "DELETE",
         headers: {
                "Content-Type": "application/json"
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
    <div
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
    </div>
  );
};

export default DeleteButton;
