import { useState } from "react";
import { login } from "../services/authService";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      // 🔥 STOCKAGE DU TOKEN
      sessionStorage.setItem("token", res.data);

      alert("Connexion réussie !");
      window.location.href = "/"; // redirection

    } catch (err) {
        console.error("ERREUR COMPLETE :", err);
        console.log("STATUS :", err.response?.status);
        console.log("DATA :", err.response?.data);
        alert("Erreur login");
      }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginPage;