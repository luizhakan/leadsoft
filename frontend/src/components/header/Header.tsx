import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  username: string;
  role: string;
  password: string;
}

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // fazer uma busca no banco de dados para saber qual a "role" do usário logado
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: Usuario[]) => {
        // comparar o role do usuário logado, e ver se é "ADMIN"
        data.forEach((user) => {
          if (user.username === localStorage.getItem("username")) {
            if (user.role === "ADMIN") {
              localStorage.setItem("role", "ADMIN");
            }
          }

          console.log(user);
        });
      });
  }, []);

  return (
    <header style={{ backgroundColor: "#383837", padding: "16px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ color: "#10D1E9", fontSize: "1.125rem", fontWeight: "bold" }}
        >
          LeadSoft
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <a
            href="/items"
            style={{
              backgroundColor: "#145EF4",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Items
          </a>
          {
            localStorage.getItem("role") === "ADMIN" ? (
              <a
                href="/users"
                style={{
                  backgroundColor: "#145EF4",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Users
              </a>
            ) : null
          }
          <button
            style={{
              backgroundColor: "#145EF4",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
