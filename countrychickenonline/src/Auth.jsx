import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileRef = useRef(null);

  const handleFieldEnter = (event, nextRef) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    if (nextRef && nextRef.current) {
      nextRef.current.focus();
    } else {
      handleSubmit();
    }
  };

  const handleMobileChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "");
    setMobile(digitsOnly);
  };

  const handleSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (!username || !password || (!isLogin && !mobile)) {
      setMessage(isLogin ? "Please enter username and password" : "Please enter username, password and mobile");
      return;
    }

    setLoading(true);
    setMessage("");

    const url = isLogin
      ? `${process.env.REACT_APP_API_BASE_URL}/auth/login`
      : `${process.env.REACT_APP_API_BASE_URL}/auth/register`;

    try {
      const payload = isLogin
        ? { username, password }
        : { username, password, mobile };

        console.log("API_BASE_URL is:", JSON.stringify(process.env.REACT_APP_API_BASE_URL));
        console.log("Request URL:", url);
        console.log("Request Payload:", JSON.stringify(payload));

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Read raw text first to guard against non-JSON responses (HTML error pages, empty responses)
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        // If parsing fails, keep the raw text so we can show a useful message
        console.warn("Auth: response is not JSON, falling back to text", parseErr);
        data = text;
      }

      if (response.ok) {
        if (isLogin) {
          if (data && typeof data === "object" && data.token) {
            // Save token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            // Save mobile if backend returns it on login
            if (data.mobile) {
              localStorage.setItem("mobile", data.mobile);
            }
            onLogin(data.username, data.role);
            navigate("/Cart");
          } else {
            // Unexpected successful response format
            setMessage(
              (typeof data === "string" && data) ||
                "Login succeeded but server returned unexpected response"
            );
          }
        } else {
          // Save mobile locally so payment can prefill even before explicit login
          if (mobile) {
            localStorage.setItem("mobile", mobile);
          }
          setMessage("Registered successfully! Please login.");
          setIsLogin(true);
        }
      } else {
        // Prefer explicit message fields if JSON, otherwise show raw text or generic message
        const errMsg =
          (data && typeof data === "object" && (data.message || data.error)) ||
          (typeof data === "string" && data) ||
          "Something went wrong";
        setMessage(errMsg);
      }
    } catch (err) {
      console.error("Error:", err);
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

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => handleFieldEnter(e, passwordRef)}
          />
          <input
            ref={passwordRef}
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleFieldEnter(e, isLogin ? null : mobileRef)}
          />

          {!isLogin && (
            <input
              ref={mobileRef}
              className="auth-input"
              type="tel"
              placeholder="Mobile number"
              value={mobile}
              onChange={handleMobileChange}
              onKeyDown={(e) => handleFieldEnter(e, null)}
              maxLength={10}
            />
          )}

          {message && <p className="auth-message">{message}</p>}

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;