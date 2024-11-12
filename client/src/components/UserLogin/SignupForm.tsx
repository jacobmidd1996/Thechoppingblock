import React, { useState } from "react";
import "./UserLogin.css";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        className="username"
        type="text"
        placeholder="Create Username"
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
