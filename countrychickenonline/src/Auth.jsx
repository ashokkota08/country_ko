import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }

    setLoading(true);
    setMessage("");

    const url = isLogin
      ? `${process.env.REACT_APP_API_BASE_URL}/auth/login`
      : `${process.env.REACT_APP_API_BASE_URL}/auth/register`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Save token and user info
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("role", data.role);
          onLogin(data.username, data.role);
          navigate("/");
        } else {
          setMessage("Registered successfully! Please login.");
          setIsLogin(true);
        }
      } else {
        setMessage(data || "Something went wrong");
      }
    } catch (err) {
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🐔</div>
        <h2 className="auth-title">Country Ko</h2>
        <p className="auth-subtitle">
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "auth-tab--active" : ""}`}
            onClick={() => { setIsLogin(true); setMessage(""); }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? "auth-tab--active" : ""}`}
            onClick={() => { setIsLogin(false); setMessage(""); }}
          >
            Register
          </button>
        </div>

        <div className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && <p className="auth-message">{message}</p>}

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;