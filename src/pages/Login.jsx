import React, { useEffect, useState } from "react";
import { fetchUsers } from "../features/todos/todosAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    fetchUsers().then(res => {
      setUsers(res.data.slice(0,3)); // limit to 3 users
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const envPass = import.meta.env.VITE_APP_SECRET_PASSWORD;
    if (password !== envPass) {
      alert("Invalid password");
      return;
    }
    const user = users.find(u => u.username === username);
    if (!user) {
      alert("Invalid username");
      return;
    }
    // store login locally, redirect
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/todos");
  };

  return (
    <div className="container centered">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <select onChange={e=>setUsername(e.target.value)} value={username}>
          <option value="">Choose user...</option>
          {users.map(u=> <option key={u.id} value={u.username}>{u.username}</option>)}
        </select>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
