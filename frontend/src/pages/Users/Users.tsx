import { useState, useEffect } from "react";
import Header from "../../components/header/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      fetchUsers();
      setNewUser({ username: "", password: "", role: "" });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div
      style={{
        backgroundColor: "#383837",
        color: "#145EF4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Header />
      <h2 style={{ color: "#10D1E9" }}>Users</h2>
      <div>
        <h3 style={{ color: "#10D1E9" }}>Create New User</h3>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#10D1E9",
              }}
            >
              Username:
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #10D1E9",
                  backgroundColor: "#383837",
                  color: "#145EF4",
                  fontWeight: "bold",
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#10D1E9",
              }}
            >
              Password:
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #10D1E9",
                  backgroundColor: "#383837",
                  color: "#145EF4",
                  fontWeight: "bold",
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#10D1E9",
              }}
            >
              Role:
              <select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #10D1E9",
                  backgroundColor: "#383837",
                  color: "#145EF4",
                  fontWeight: "bold",
                }}
              >
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="BASIC">BASIC</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#10D1E9",
              color: "#383837",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create User
          </button>
        </form>
      </div>
      <div>
        <h3 style={{ color: "#10D1E9" }}>List of Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
