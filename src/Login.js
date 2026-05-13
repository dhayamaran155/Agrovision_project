import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Clear form every time page opens
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
     
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: email,
    password: password,
  }),
});


      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.access) {
        login(data.access);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    }
  };

  return (
    <div className="login-page">
      <style>{`
        body {
          margin: 0;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #1b4332, #74c69d);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          box-sizing: border-box;
        }

        .form-container {
          background: white;
          padding: 35px;
          border-radius: 16px;
          width: min(100%, 360px);
          text-align: center;
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
          animation: fadeSlide 0.9s ease;
          box-sizing: border-box;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-container h2 {
          color: #2d6a4f;
          margin-bottom: 20px;
        }

        .form-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
        }

        .form-container button {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #2d6a4f, #40916c);
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .form-container button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }

        .error {
          color: red;
          margin-top: 8px;
          font-size: 14px;
        }

        .link {
          color: #2d6a4f;
          font-weight: bold;
          cursor: pointer;
          text-decoration: underline;
        }

        .home-btn {
          margin-top: 12px;
          padding: 10px 15px;
          border: 1px solid #2d6a4f;
          background: white;
          color: #2d6a4f;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 20px 16px;
          }
        }
      `}</style>

      <div className="form-container">
        <h2>🌱 AGROVISION Login</h2>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button type="submit">Login</button>

          {error && <p className="error">{error}</p>}
        </form>

        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

        <Link to="/">
          <button className="home-btn">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
