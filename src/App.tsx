import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { OrdersPage } from "@/pages/OrdersPage";
import { AddBook } from "@/pages/AddBook";
import { LoginPage } from "@/pages/LoginPage";

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthed(localStorage.getItem("admin_auth") === "1");
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthed(true);
  };

  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] bg-[var(--page-bg)]">
        <Routes>
          <Route
            path="/login"
            element={
              authed ? <Navigate to="/" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route
            path="/"
            element={authed ? <OrdersPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/add"
            element={authed ? <AddBook /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
