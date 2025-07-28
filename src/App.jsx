// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Savollar from "./pages/Savollar";
import Promokodlar from "./pages/Promokodlar";
import Login from "./pages/Login";
import Foydalanuvchilar from "./pages/Foydalanuvchilar";
import SavolDetails from "./pages/SavolDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<MainPage />}>
        <Route path="savollar" element={<Savollar />} />
        <Route path="savollar/:id" element={<SavolDetails />} />
        <Route path="promokodlar" element={<Promokodlar />} />
        <Route path="foydalanuvchilar" element={<Foydalanuvchilar />} />
      </Route>
    </Routes>
  );
}

export default App;
