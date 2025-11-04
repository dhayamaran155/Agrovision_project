import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error!");
    }
  };

  return (
    <div className="login-page">
      {/* ✅ Internal CSS (fixed with backticks) */}
      <style>{`
        .login-page {
          height: 100vh;
          width: 100%;
          background-image: url('/Background2.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .form-container {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 15px;
          width: 350px;
          text-align: center;
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
        }
        .form-container h2 {
          margin-bottom: 20px;
          color: #2d6a4f;
          font-weight: bold;
        }
        .form-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }
        .form-container button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 8px;
          background-color: #2d6a4f;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .form-container button:hover {
          background-color: #1b4332;
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
          background-color: #40916c;
          margin-top: 10px;
        }
        .home-btn:hover {
          background-color: #1b4332;
        }
      `}</style>

      <div className="form-container">
        <h2>🌱 AGROVISION Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <p>
          <Link to="/">
            <button className="home-btn">Go to Home</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
