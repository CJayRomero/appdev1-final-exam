import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const navigate = useNavigate();
  const user = typeof window !== "undefined" && localStorage.getItem("user");

  return (
    <div className="home-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 40px" }}>
        <div style={{ fontWeight: 700, letterSpacing: 1 }}>My Todo App</div>
        <ThemeToggle />
      </header>

      <main style={{ flex: 1, display: "grid", placeItems: "center" }}>
        <section style={{ textAlign: "center", maxWidth: 900, padding: "20px" }}>
          <h1 className="title" style={{ fontSize: "clamp(40px, 8vw, 88px)", margin: 0 }}>
            Just do it.
          </h1>
          <p style={{ marginTop: 16, opacity: 0.85 }}>
            A tiny, fast todo app — add tasks, finish them, edit, and delete. Switch themes with the buttons on the top-right.
          </p>

          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {user ? (
              <>
                <button
                  className="btn"
                  onClick={() => navigate("/todos")}
                  style={{ padding: "10px 18px", borderRadius: 12 }}
                >
                  Open Todos
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  style={{ padding: "10px 18px", borderRadius: 12 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn" style={{ padding: "10px 18px", borderRadius: 12, textDecoration: "none" }}>
                  Login
                </Link>
                <button className="btn" onClick={() => navigate("/todos")} style={{ padding: "10px 18px", borderRadius: 12 }}>
                  Try Demo
                </button>
              </>
            )}
          </div>

          <small style={{ display: "block", marginTop: 18, opacity: 0.6 }}>
            Tip: use the secret password from your `.env` (VITE_APP_SECRET_PASSWORD) to log in during the exam.
          </small>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "18px 0", opacity: 0.6 }}>
        © {new Date().getFullYear()} — Todo App
      </footer>
    </div>
  );
}
