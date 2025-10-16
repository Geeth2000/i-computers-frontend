import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/homePage";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen bg-primary text-secondary ">
        <Routes path="/">
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
