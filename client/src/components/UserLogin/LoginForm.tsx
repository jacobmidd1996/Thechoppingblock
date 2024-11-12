import React, { useState } from "react";
import "./UserLogin.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        className="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
