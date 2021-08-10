import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChange(e) {
    e.target.className === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  }
  async function onSubmit() {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const { jwt, userId } = await response.json();
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId.toString());
      onLogin();
    } else {
      return "User not found";
    }
  }
  return (
    <div>
      <input
        type="text"
        className="username"
        value={username}
        onChange={onChange}
      />
      <input
        type="password"
        className="password"
        value={password}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Log in</button>
    </div>
  );
}

export default Login;
